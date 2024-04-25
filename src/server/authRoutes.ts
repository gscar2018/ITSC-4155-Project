import express from "express";
import { signupHandler } from "../client/api/auth/signup.ts";
import { loginHandler } from "../client/api/auth/login.ts";
import { logoutHandler } from "../client/api/auth/logout.ts";
import type { Request, Response } from "express";

const router = express.Router();

// Route to handle user signup
router.post("/signup", signupHandler);

// Route to handle user login
router.post("/login", loginHandler);
router.post("/logout", logoutHandler);

//api route to check user status.
router.get("/loginStatus", (req: Request, res: Response) => {
	try {
		//set uesrId from session to a variable
		const userId = req.session?.userId;
		if (userId) {
			console.log("User logged in:", userId);
			return res.status(200).json({ isLoggedIn: true, userId: userId });
		}
		return res.status(200).json({ isLoggedIn: false });
	} catch (error) {
		console.error("Error checking user status:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
});

export default router;
