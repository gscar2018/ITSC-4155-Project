import express from "express";
import multer from 'multer';
import { getPosts, getPostById } from "./apiMethods.ts";
import { Post } from "../types.ts";
import { PostModel } from "./schemas/image.ts";

let router = express.Router();
const upload = multer({ dest: 'uploads/' });

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

// Endpoint for uploading an image
router.post("/upload", upload.single('image'), async (req, res) => {
  console.log("test");
  if (!req.file) {
    return res.status(400).json({ error: "Please upload a file." });
  }

  const { title = "Default Title", content = "Default Content", caption = "Default Caption", tags = "default" } = req.body;

  try {
    const newPost = new PostModel({
      title,
      content,
      image: {
        url: req.file.path, // Or the URL if you're using cloud storage
        caption,
      },
      tags: tags.split(","),
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error saving post with image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


export default router;
