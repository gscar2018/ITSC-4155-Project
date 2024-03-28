import express from "express";
import { getPosts, getPostById } from "./apiMethods.ts";
import { Post } from "../types.ts";
import { PostModel } from "./schemas/image.ts";
import multer from "multer";

//setting up mutler
const storage = multer.diskStorage({
  //destination to store files
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  //what each file should be named
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

let router = express.Router();

//test api route for TestPage.tsx in client
router.get("/hello", (_, res) => {
  return res.send("Data successfully fetched from server!");
});

//api route for HomePage.tsx in client
router.get("/data", async (_, res) => {
  try {
    const posts: Post[] = await getPosts();
    return res.json(posts);
  } catch (error) {
    console.error("Could not get posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//api route for PostPage.tsx in client
router.get("/data/:id", async (req, res) => {
  //convert id to number for req.params
  try {
    const post: Post | null = await getPostById(req.params.id);
    if (post) {
      return res.json(post);
    } else {
      return res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error("Could not get post:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for uploading an image
router.post("/upload", upload.single("image"), async (req, res) => {
  //error handling
  if (!req.file) {
    return res.status(400).json({ error: "Please upload a file." });
  }
  const {
    title = "Default Title",
    content = "Default Content",
    caption = "Default Caption",
    tags = "default",
  } = req.body;
  console.log("File uploaded. preparing to save to database");
  try {
    const newPost = new PostModel({
      title: title,
      content: content,
      image: {
        url: req.file.path, // Or the URL if you're using cloud storage
        caption: caption,
      },
      tags: tags.split(","),
    });

    await newPost.save();
    return res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error saving image:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
