import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the image document
interface Image {
    url: string;
    caption?: string;
}

// Define an interface for the post document
interface Post extends Document {
    title: string;
    content: string;
    images: Image[];
    tags: string[];
    createdAt: Date;
}

// Define the schema for the post document
const postSchema = new Schema<Post>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [{
        url: { type: String, required: true },
        caption: { type: String }
    }],
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

// Define and export the Post model
const PostModel = mongoose.model<Post>('Post', postSchema);
export default PostModel;