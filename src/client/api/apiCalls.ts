import type { LoaderFunctionArgs } from "react-router-dom";
import type { Post } from "../../types";
import axios from "axios";

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

// ---------------- Auth api calls ----------------
export const checkLogin = async () => {
	try {
		const response = await axios.get("/api/auth/loginStatus", {
			withCredentials: true,
		});
		return response.data.isLoggedIn;
	} catch (error) {
		console.error("Error with login status:", error);
		return false;
	}
};
