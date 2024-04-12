import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
    email: string;
    password: string;
}

const userSchema = new Schema<UserDocument>({
    email: { type: String, required: [true, 'Email cannot be empty'], unique: true },
    password: { type: String, required: [true, 'Password cannot be empty'] },
});

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;