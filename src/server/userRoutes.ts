import express from "express";
import type { Request, Response } from "express";
import { getUser, getUserFavorites, getUserPosts } from "./apiMethods.ts";

const router = express.Router();

router.get("/:userId", getUser);
router.get("/:userId/posts", getUserPosts);
router.get("/:userId/favorites", getUserFavorites);

export default router;
