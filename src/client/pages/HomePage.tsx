import { Icon } from "@iconify/react/dist/iconify.js";
import { Post } from "../../types";
import { fetchPosts } from "../api/apiCalls";
import { useState, useEffect } from "react";

function HomePage() {
  //fetchPosts does the whole api call, we only need to call it once

  const [posts, setPosts] = useState<Post[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!posts) {
      fetchPosts().then((data) => {
        setPosts(data);
      });
    }
  }, [posts]);

  if (!posts) {
    // Handle the case when data is undefined
    return <div></div>;
  }
  return (
    <div className="p-5">
      <div className="px-10 p-5 flex flex-row justify-center items-center">
        <label className="input input-bordered  w-auto justify-center items-center">
          <input type="text" className="grow" placeholder="Search" />
          <button className="btn btn-ghost">
            <Icon className="text-3xl" icon="mdi:magnify" />
          </button>
        </label>
      </div>
      <div className="flex justify-center my-5">
        {/* <ImageUpload onUploadSuccess={() => setRefreshPage(true)} />{" "} */}
        {/* Pass a function to trigger refresh */}
      </div>
      <div className="gap-5 grid grid-cols-1  md:grid-cols-3 items-center justify-center">
        {/* loop to render card*/}
        {posts
          .slice()
          .reverse()
          .map((post, index) => {
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
                  className="mt-6 btn btn-sm btn-neutral text-neutral-content font-bold py-2 px-4 rounded"
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
