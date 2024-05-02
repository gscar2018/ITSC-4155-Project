import type { Request, Response } from "express";
import { PostModel } from "../schemas/Post.ts";

//searching posts by tag
export const searchPostsByTags = async (req: Request, res: Response) => {
	const { tags } = req.query;
	if (!tags) {
		return res.status(400).json({ error: "Tags must be provided" });
	}
	try {
		const tagsArr = Array.isArray(tags) ? tags : [tags];
		const regexSearch = tagsArr.map((tag) => new RegExp(tag.toString(), "i"));
		const posts = await PostModel.find({ tags: { $in: regexSearch } });
		return res.json(posts);
	} catch (error) {
		console.error("Error searching posts:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};
