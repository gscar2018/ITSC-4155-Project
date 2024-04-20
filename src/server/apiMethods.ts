//functions to handle api logic
import multer from "multer";
import { PostModel } from "./schemas/Post.ts";
import type { Request, Response } from "express";
import type { Post } from "../types.ts";

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
		const newPost = new PostModel({
			title: title,
			content: content,
			image: {
				url: req.file.path, // Or the URL if you're using cloud storage
				caption: caption,
			},
			tags: tags.split(" "),
		});

		await newPost.save();
		return res.status(200).json({ message: "Image uploaded successfully" });
	} catch (error) {
		console.error("Error saving image:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}
