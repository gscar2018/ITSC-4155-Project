//functions to handle api logic
import multer from "multer";
import { PostModel } from "./schemas/Post.ts";
import type { Request, Response } from "express";
import type { Post } from "../types.ts";
import UserModel from "./schemas/User.ts";

//function to get all posts
// export async function getPosts() {
//   const posts = await PostModel.find().lean();
//   return posts;
// }
export async function getPosts(req: Request, res: Response) {
	try {
		const posts: Post[] = await PostModel.find().lean();
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

const upload = multer({ storage: storage });
export const imageUploadHandler = upload.single("image");
export async function createPost(req: Request, res: Response) {
	//error handling
	if (!req.file) {
		return res.status(400).json({ error: "Please upload a file." });
	}
	const {
		title = "Default Title",
		content = "Default Content",
		tags = "default",
		caption = "Default Caption",
	} = req.body;

	console.log("File uploaded. preparing to save to database");
	try {
		const { userId, title, tags, caption } = req.body;
		const imageFile = req.file;
		if (!imageFile) {
			return res.status(400).json({ error: "No file provided" });
		}
		const newPost = new PostModel({
			user: userId,
			title: title,
			content: content,
			image: {
				url: req.file.path, // Or the URL if you're using cloud storage
				caption,
			},
			tags: tags.split(" "),
		});

		const savedPost = await newPost.save();

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
		const posts = await PostModel.find({ user: userId })
			.populate("user", "username")
			.lean();

		return res.status(200).json(posts);
	} catch (error) {
		console.error("Could not get User posts:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getUserFavorites = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const user = await UserModel.findById(userId).lean();

		const favoritePosts: { [collectionName: string]: Post[] } = {};

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		for (const [collectionName, postIds] of Object.entries(
			user.favoritePosts,
		)) {
			const posts = (await PostModel.find({
				_id: { $in: postIds },
			}).lean()) as Post[];
			favoritePosts[collectionName] = posts;
		}

		return res.status(200).json(user?.favoritePosts);
	} catch (error) {
		console.error("Could not get User favorites:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
