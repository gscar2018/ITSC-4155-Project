import mongoose, { Schema, Document, Types } from "mongoose";
import type { Post } from "../../types.ts";

// Define the schema for the post document
const postSchema = new Schema<Post>({
	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
	title: { type: String},
	content: { type: String, required: true },
	image: {
		url: { type: String },
		caption: { type: String },
		data: { type: String, required: true },
	},

	tags: [{ type: String }],
	createdAt: { type: Date, default: Date.now },
});

// Define and export the Post model
export const PostModel = mongoose.model<Post>("Post", postSchema);
