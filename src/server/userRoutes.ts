import express from "express";
import type { Request, Response } from "express";
import {
	addToFavorites,
	getUser,
	getUserFavorites,
	getUserPosts,
} from "./apiMethods.ts";

const router = express.Router();

router.get("/:userId", getUser);
router.get("/:userId/posts", getUserPosts);
router.get("/:userId/favorites", getUserFavorites);
router.post("/:userId/favorites/post", addToFavorites);

export default router;
