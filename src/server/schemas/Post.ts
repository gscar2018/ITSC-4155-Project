import mongoose, { Schema, Document } from "mongoose";
import { Post } from "../../types.ts";

// Define the schema for the post document
const postSchema = new Schema<Post>({
  //   user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: {
    url: { type: String, required: true },
    caption: { type: String },
  },

  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

// Define and export the Post model
export const PostModel = mongoose.model<Post>("Post", postSchema);
