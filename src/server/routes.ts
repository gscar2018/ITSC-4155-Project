import express from "express";
import { posts } from "./model.js";
let router = express.Router();
router.get("/hello", (_, res) => {
  res.send("Data successfully fetched from server!");
});
/**
 * Gets all posts
 */
router.get("/data", (_, res) => {
  res.json(posts);
});
router.get("/data/:id", (req, res) => {
  const { id } = req.params;
  //find the content with the id
  const data = posts.find((post) => post.id === Number(id));
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ message: "Content not found" });
  }
});

export default router;
