import { useLoaderData } from "react-router-dom";
import { Post } from "../../types";

function HomePage() {
  const data = useLoaderData() as Post[];
  return (
    <div className="p-5">
      <div className="gap-5 grid grid-cols-1  md:grid-cols-3 items-center justify-center">
        {/* loop to render card 6 times */}
        {data.map((post) => {
          return (
            <div className="container flex flex-col items-center" key={post.id}>
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full max-w-lg"
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
                href={`/post/${post.id}`}
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
