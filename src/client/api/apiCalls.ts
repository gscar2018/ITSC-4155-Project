import { LoaderFunctionArgs } from "react-router-dom";
import { Post } from "../../types";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("/api/data");
  console.log(response);
  if (!response.ok) throw new Error("Content not found");
  return response.json();
};
export const fetchPostSlug = async ({
  params,
}: LoaderFunctionArgs): Promise<Post> => {
  const response = await fetch(`/api/data/${params.id}`);
  if (!response.ok) throw new Error("Content not found");
  return response.json();
};

export const createPost = async (formData: FormData) => {
  const response = await fetch("/api/data/upload", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Content not found");
  return response.json();
};
