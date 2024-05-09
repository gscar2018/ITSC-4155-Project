import { toast } from "react-toastify";
import type { Post } from "../../../types";

const sendMessage = async (post: Post) => {
	try {
		const response = await fetch(`/api/data/openai/${post._id}`);
		const blob = await response.blob();
		//convert image to base64 strings for backend
		//wait for images to be converted
		// const charArr = base64Str?.split("");
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onload = async () => {
			const data = reader.result as string;
			const base64Str = data.split(",")[1];
			///payload for the openai api

			const payload = { images: [base64Str] };
			try {
				const response = await fetch("/api/openai", {
					body: JSON.stringify(payload),
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				});
				//error handling
				if (!response.ok) {
					throw new Error("Failed to send message");
				}
				//store the response data to access it later
				const data = await response.json();
				console.log(data);
				return data;
			} catch (error) {
				toast.error("Failed to send message");
				console.error(error);
			} finally {
			}
			reader.onerror = (error) => error;
		};
	} catch (error) {
		toast.error("Failed to send message");
		console.error(error);
	}
};

export default sendMessage;
