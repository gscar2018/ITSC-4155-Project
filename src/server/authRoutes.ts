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
	if (req.session.userId) {
		return res
			.status(200)
			.json({ isLoggedIn: true, userId: req.session.userId });
	}
	return res.status(200).json({ isLoggedIn: false });
});

export default router;
