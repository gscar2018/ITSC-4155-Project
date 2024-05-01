import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { Post } from "../../types.js";

function PostPage() {
  const post = useLoaderData() as Post;
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch the username based on the user ID associated with the post
    fetch(`/api/users/${post.user}`)
      .then((response) => response.json())
      .then((userData) => setUsername(userData.username))
      .catch((error) => console.error("Error fetching username:", error));
  }, [post.user]);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-2 items-center justify-center md:justify-start md:items-start">
          <h1>Posted by: {username}</h1>
          <img
            src={
              post.image.data || `${window.location.origin}/${post.image.url}`
            }
            alt={post.image.caption}
            className="w-auto h-auto object-cover rounded-lg"
          />
        </div>
        <div className="">
          <h2>Tags</h2>
          <div className="flex space-x-2 m-5 pb-5">
            {post.tags.map((tag) => {
              return (
                <span
                  key={tag}
                  className="inline-block bg-base-200 rounded-full px-3 py-1 text-sm font-semibold"
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;