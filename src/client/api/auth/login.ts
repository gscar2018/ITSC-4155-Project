import express from "express";
import type { Request, Response } from "express";
import UserModel, { UserDocument } from "../../../server/schemas/User.ts";

export const loginHandler = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	console.log("Received login request:", email, password);

	try {
		const user = await UserModel.findOne({ email });

		if (!user || user.password !== password) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		// Store the user ID in the session
		req.session.userId = user._id;
		res.status(200).json({ message: "Login successful", user });
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
