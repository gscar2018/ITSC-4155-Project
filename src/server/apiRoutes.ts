import express from "express";
import { getPosts, getPostById } from "./apiMethods.ts";
import { Post } from "../types.ts";

let router = express.Router();

//test api route for TestPage.tsx in client
router.get("/hello", (_, res) => {
  res.send("Data successfully fetched from server!");
});

//api route for HomePage.tsx in client
router.get("/data", async (_, res) => {
  try {
    const posts: Post[] = await getPosts();
    console.log(posts);
    res.json(posts);
  } catch (error) {
    console.error("Could not get posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//api route for PostPage.tsx in client
router.get("/data/:id", async (req, res) => {
  //convert id to number for req.params
  try {
    const post: Post | null = await getPostById(req.params.id);
    if (post) {
      console.log(post);
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error("Could not get post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
