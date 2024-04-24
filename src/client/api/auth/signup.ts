import express from "express";
import type { Request, Response } from "express";
import UserModel, { UserDocument } from "../../../server/schemas/User.ts";
import { hash } from "bcrypt";

export const signupHandler = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body;
		const existingUser = await UserModel.findOne({ email });

		if (existingUser) {
			return res.status(400).json({ message: "Email already in use" });
		}
		const passwordHashed = await hash(password, 10);

		const newUser = await UserModel.create({
			email,
			password: passwordHashed,
			username,
		});
		await newUser.save();

		req.session.userId = newUser._id;

		res.status(201).json({ message: "Signup successful", userId: newUser._id });
	} catch (error) {
		console.error("Signup error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
