import { useLoaderData } from "react-router-dom";
import { Post } from "../../types";
import ImageUpload from "../components/ImageUpload";
import { useState } from "react";

function HomePage() {
  const data = useLoaderData() as Post[];

  return (
    <div className="p-5">
      <div className="flex justify-center my-5">
        <ImageUpload />
      </div>
      <div className="gap-5 grid grid-cols-1  md:grid-cols-3 items-center justify-center">
        {/* loop to render card*/}
        {data.map((post, index) => {
          if (!post || !post.image) {
            console.warn(
              `Post at index ${index} is undefined or missing image.`
            );
            return null; // Or display a placeholder component/message.
          }
          return (
            <div
              className="container flex flex-col items-center"
              key={post._id}
            >
              {/* dynamic img size based on mobile or desktop screen size */}
              <img
                src={post.image.url}
                alt={post.image.caption}
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-lg"
              />
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-base-200 rounded-full px-3 py-1 text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                className="mt-6 btn btn-sm btn-secondary font-bold py-2 px-4 rounded"
                href={`/post/${post._id}`}
              >
                View More
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
