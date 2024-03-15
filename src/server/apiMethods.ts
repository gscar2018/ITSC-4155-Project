//functions to handle api logic
import { PostModel } from "./schemas/image.ts";
//function to get all posts
export async function getPosts() {
  const posts = await PostModel.find();
  return posts;
}

export async function getPostById(id: string) {
  const post = await PostModel.findById(id);
  return post;
}
