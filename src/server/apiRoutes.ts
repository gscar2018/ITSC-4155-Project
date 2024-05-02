import express from "express";
import { getPosts, getPostById } from "./apiMethods.ts";
import { imageUploadHandler, createPost } from "./apiMethods.ts";
import { searchPostsByTags } from "./controllers/postController.ts";
import { deletePost } from "./apiMethods.ts";
const router = express.Router();

//test api route for TestPage.tsx in client
router.get("/hello", (_, res) => {
	return res.send("Data successfully fetched from server!");
});

//api route for HomePage.tsx in client
router.get("/data", getPosts);

//api route for PostPage.tsx in client
router.get("/data/:id", getPostById);

// Endpoint for uploading an image
router.post("/data/upload", imageUploadHandler, createPost);

//endpoint for searching routes by tag
router.get("/posts/search", searchPostsByTags);

//endpoint for deleting a post
router.delete("/data/:postId", deletePost);

export default router;
