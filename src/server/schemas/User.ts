import mongoose, { Schema } from "mongoose";
import type { Document } from "mongoose";

export interface UserDocument extends Document {
	username: string;
	email: string;
	password: string;
	favoritePosts: string[];
	createdAt: Date;
}

const userSchema = new Schema<UserDocument>({
	username: { type: String, required: [true, "Username cannot be empty"] },
	email: {
		type: String,
		required: [true, "Email cannot be empty"],
		unique: true,
	},
	password: { type: String, required: [true, "Password cannot be empty"] },
	favoritePosts: [{ type: Schema.Types.ObjectId, ref: "Post", default: [] }],

	createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
