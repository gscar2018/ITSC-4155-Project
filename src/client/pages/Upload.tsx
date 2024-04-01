import React, { useState, useEffect } from "react";
import ImageUpload from "../components/ImageUpload";

function UploadPage() {
  const [refreshPage, setRefreshPage] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (refreshPage) {
      window.location.reload();
    }
  }, [refreshPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send form data to the server using an API call
    // ...
    setRefreshPage(true);
  };

  return (
    <div className="container mx-auto py-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Upload Post</h1>
      <form onSubmit={handleSubmit} className="form-control max-w-sm ">
        <div className="mb-4">
          <label htmlFor="title" className="label">
            <span className="label-text">Title:</span>
          </label>
          <input
            type="text"
            id="title"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="label">
            <span className="label-text">Content:</span>
          </label>
          <textarea
            id="content"
            className="textarea textarea-bordered w-full"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="label">
            <span className="label-text">Tags:</span>
          </label>
          <input
            type="text"
            id="tags"
            className="input input-bordered w-full"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        <ImageUpload onUploadSuccess={() => setRefreshPage(true)} />
        <button type="submit" className=" py-5 btn btn-primary rounded-md">
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadPage;
