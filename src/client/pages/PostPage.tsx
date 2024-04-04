import { useEffect, useState } from "react";
import { Post } from "../../types.js";
import { useParams } from "react-router-dom";
import { fetchPostSlug } from "../api/apiCalls.js";

function PostPage() {
  /**
     * export const fetchPostSlug = async ({
  params,
}: LoaderFunctionArgs): Promise<Post> => {
  const response = await fetch(`/api/data/${params.id}`);
  if (!response.ok) throw new Error("Content not found");
  return response.json();
};
     */
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      fetchPostSlug(id).then((data) => {
        setPost(data);
      });
    }
  }, [id]);

  if (!post) {
    return <div></div>;
  }

  //creating a function to append post.image.url to the end of any url
  function createImageUrl() {
    if (!post) {
      throw new Error("Post is null");
    }
    //grab the current url https://{name}.com/
    const currentUrl = window.location.href;
    //since there should be 3 slashes by now, we delete everything after the 3rd /
    const baseUrl = currentUrl.slice(0, currentUrl.indexOf("/", 8) + 1);
    return baseUrl + post.image.url;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-2 items-center justify-center md:justify-start md:items-start">
          <img
            src={createImageUrl()}
            alt={post.image.caption}
            className="max-w-full h-80 md:h-96 object-cover rounded-lg"
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
