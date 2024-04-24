import type { Request, Response } from "express";
export const logoutHandler = async (req: Request, res: Response) => {
	try {
		req.session?.destroy((err) => {
			if (err) {
				console.error("Error destroying session:", err);
				res.status(500).json({ message: "Internal server error" });
			}
			return res.status(200).json({ message: "Logout successful" });
		});
	} catch (error) {}
};
