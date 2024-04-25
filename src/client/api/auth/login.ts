import express from "express";
import type { Request, Response } from "express";
import UserModel, { UserDocument } from "../../../server/schemas/User.ts";
import { compare } from "bcrypt";

export const loginHandler = async (req: Request, res: Response) => {
	try {
		const { email, password, username } = req.body;
		console.log("Received login request:", email, password, username);

		const user = await UserModel.findOne({ email });

		if (!user) {
			return res.status(401).json({ message: "Invalid email or password" });
		}
		const isMatch = await compare(password, user.password);

		if (!isMatch) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		// Store the user ID in the session
		req.session.userId = user._id;

		res.status(200).json({ message: "Login successful", userId: user._id });
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
