// this file is purely to test the functionality of the schemas
import mongoose from "mongoose";
import { PostModel } from "./image.ts";
export async function testSchema() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://khoder23:ITSC-4155@cluster0.tcdyzkj.mongodb.net/ImgTag"
    );

    // Create a new post
    const newPost = new PostModel({
      title: "Test Post1",
      content: "This is a test post content",
      image: { url: "https://t.ly/oY2ab", caption: "Image 1" },
      tags: ["tag1", "tag2", "tag3"],
    });

    // post2
    const newPost2 = new PostModel({
      title: "Test Post2",
      content: "This is a test post content",
      image: { url: "https://t.ly/70OdN", caption: "Image 1" },
      tags: ["tag1", "tag2", "tag3"],
    });
    //post3
    const newPost3 = new PostModel({
      title: "Test Post3",
      content: "This is a test post content",
      image: { url: "https://t.ly/CUvT7", caption: "Image 1" },
      tags: ["tag1", "tag2", "tag3"],
    });

    // Save the new post to the database
    await Promise.all([newPost.save(), newPost2.save(), newPost3.save()]);

    // // Find the saved posts
    // const [savedPost, savedPost2, savedPost3] = await Promise.all([
    //   PostModel.findOne({ title: "Test Post1" }),
    //   PostModel.findOne({ title: "Test Post2" }),
    //   PostModel.findOne({ title: "Test Post3" })
    // ]);

    // Log the saved post
    // console.log(savedPost, savedPost2, savedPost3);

    // Disconnect from MongoDB
    // await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
  }
}
