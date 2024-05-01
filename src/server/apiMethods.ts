//functions to handle api logic
import multer from "multer";
import { PostModel } from "./schemas/Post.ts";
import type { Request, Response } from "express";
import type { Post } from "../types.ts";
import UserModel from "./schemas/User.ts";
import axios from "axios";
import { caching } from "cache-manager";

const cacheWrapper = await caching("memory", {
	max: 100, //max items in cache
	ttl: 60 * 60, // 1 hour
	refreshThreshold: 30 * 60, // 1 hour
});

export async function getPosts(req: Request, res: Response) {
	try {
		const posts: Post[] = await cacheWrapper.wrap("posts", async () => {
			return PostModel.find().lean();
		});
		return res.json(posts);
	} catch (error) {
		console.error("Could not get posts:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}

export async function getPostById(req: Request, res: Response) {
	//convert id to number for req.params
	try {
		const post: Post | null = await PostModel.findById(req.params.id).lean();

		if (post) {
			return res.json(post);
		}
		return res.status(404).json({ error: "Post not found" });
	} catch (error) {
		console.error("Could not get post:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}

// Setting up Multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

// const upload = multer({ storage: storage });
const upload = multer();
export const imageUploadHandler = upload.single("image");
export async function createPost(req: Request, res: Response) {
	//error handling
	if (!req.file) {
		return res.status(400).json({ error: "Please upload a file." });
	}

	console.log("File uploaded. preparing to save to database");
	try {
		const formData = new FormData();
		formData.append(
			"file",
			new Blob([req.file.buffer], { type: req.file.mimetype }),
		);

		const inferenceRequest = await axios.post(
			"http://localhost:8000/predict",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
		);

		const inferredTags = inferenceRequest.data.tags;

		const { userId, title, tags, caption, content = "Default" } = req.body;

		let allTags: string[];
		if (tags) {
			allTags = inferredTags.concat(tags.split(" "));
		} else {
			allTags = inferredTags;
		}

		const newPost = new PostModel({
			user: userId,
			title: title,
			content: content,
			image: {
				caption,
				data: `data:${req.file.mimetype};base64,${req.file.buffer.toString(
					"base64",
				)}`,
			},
			tags: allTags,
		});

		const savedPost = await newPost.save();

		await cacheWrapper.del("posts");

		return res
			.status(200)
			.json({ message: "Image uploaded successfully", post: savedPost });
	} catch (error) {
		console.error("Error saving image:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}

// --------------------------User Posts/Favs-----------------------------------
export const getUser = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const user = await UserModel.findById(userId).lean();
		return res.status(200).json(user);
	} catch (error) {
		console.error("Could not get User:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
export const getUserPosts = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		// const posts = await PostModel.find({ user: userId })
		// 	.populate("user", "username")
		// 	.lean();
		const posts = await cacheWrapper.wrap("userPosts", async () => {
			return PostModel.find({ user: userId })
				.populate("user", "username")
				.lean();
		});

		return res.status(200).json(posts);
	} catch (error) {
		console.error("Could not get User posts:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getUserFavorites = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		// const user = await UserModel.findById(userId)
		// 	.lean()
		// 	.populate("favoritePosts");
		const user = await cacheWrapper.wrap("userFavorites", async () => {
			return UserModel.findById(userId).lean().populate("favoritePosts");
		});

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		return res.status(200).json(user?.favoritePosts);
	} catch (error) {
		console.error("Could not get User favorites:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export const addToFavorites = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const { postId } = req.body;

		const user = await UserModel.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const post = await PostModel.findById(postId);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		//if post is not in favorites, add it, else remove it
		if (!user.favoritePosts.includes(postId)) {
			user.favoritePosts.push(postId);
			await user.save();
		} else {
			const index = user.favoritePosts.indexOf(postId);
			if (index > -1) {
				user.favoritePosts.splice(index, 1);
			}
			await user.save();
		}

		await cacheWrapper.del("userFavorites");

		return res.sendStatus(200);
	} catch (error) {
		console.error("Could not add post to favorites:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
