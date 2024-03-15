import { useLoaderData } from "react-router-dom";
import { Post } from "../../types.js";

function PostPage() {
  const post = useLoaderData() as Post;
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-2 items-center justify-center md:justify-start md:items-start">
          <img
            src={post.image.url}
            alt={post.image.caption}
            className="w-auto h-auto object-cover rounded-lg"
          />
          <h1>{post.title}</h1>
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
          <h2>description</h2>
          <div className="border border-solid border-info rounded-lg p-4 mt-4 ">
            <p className="text-info ">
              {post.content}
              <span className="text-secondary font-semibold">
                (temporary until ai api is used to generate the description)
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
