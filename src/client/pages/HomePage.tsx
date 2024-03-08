import { useState } from "react";

function HomePage() {
  const count = 6;
  return (
    <div className="p-5">
      <div className="gap-5 grid grid-cols-1  md:grid-cols-3 items-center justify-center">
        {/* loop to render card 6 times */}
        {[...Array(count)].map((_, index) => (
          <div key={index} className="container flex flex-col items-center">
            <img
              src="https://placehold.co/600x400"
              alt="Your image description"
              className="w-full max-w-lg"
            />
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="inline-block bg-base-200 rounded-full px-3 py-1 text-sm font-semibold ">
                Tag 1
              </span>
              <span className="inline-block bg-base-200 rounded-full px-3 py-1 text-sm font-semibold ">
                Tag 2
              </span>
              <span className="inline-block bg-base-200 rounded-full px-3 py-1 text-sm font-semibold ">
                Tag 3
              </span>
            </div>
            <button className="mt-6 btn btn-sm btn-secondary font-bold py-2 px-4 rounded">
              View More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
