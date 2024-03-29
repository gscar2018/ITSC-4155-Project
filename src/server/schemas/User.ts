//schema for creating a user account
import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const userSchema = new Schema<UserDocument> ({
    firstName: { type: String, required: [true, 'cannot be empty']},
    lastName: { type: String, required: [true, 'cannot be empty']},
    email: { type: String, required: [true, 'cannot be empty'], unique: true},
    password: { type: String, required: [true, 'cannot be empty']},
});

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;