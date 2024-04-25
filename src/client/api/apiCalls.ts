import type { LoaderFunctionArgs } from "react-router-dom";
import type { Post, User } from "../../types";
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
	try {
		const response = await axios.post("/api/data/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
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
// ---------------- User specific api calls ----------------
export const getUserHandler = async (userId: string) => {
	try {
		const response = await axios.get(`/api/users/${userId}`);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const getUserPostsHandler = async (userId: string) => {
	try {
		const response = await axios.get(`/api/users/${userId}/posts`);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getUserFavoritesHandler = async (userId: string) => {
	try {
		const response = (await axios.get(`/api/users/${userId}/favorites`)) || [];
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
