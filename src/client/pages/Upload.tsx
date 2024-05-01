import type React from "react";
import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import { createPost } from "../api/apiCalls";
import { useAuth } from "../api/auth/authContext";
function UploadPage() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [tags, setTags] = useState("");
	//set a var to userId
	const userId = useAuth().userId ?? "";

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Send form data to the server using an API call
		const formData = new FormData();
		console.log(`upload.tsx: userId: ${userId}`);
		//append userId
		formData.append("userId", userId);
		//caption will be title
		formData.append("title", title);
		formData.append("tags", tags);

		const file = document.querySelector(
			'input[type="file"]',
		) as HTMLInputElement;
		if (file.files && file.files.length > 0) {
			formData.append("image", file.files[0]);
			formData.append("caption", file.files[0].name);
		} else {
			alert("Please select an image to upload");
			throw new Error("Please select an image to upload");
		}
		try {
			const res: Response = await createPost(formData);
			console.log(res);
			//if successful, redirect to homepage
			alert("Post created successfully");
			window.location.href = "/";
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
		<div className="border-t-8 rounded-sm border-neutral bg-white p-12 shadow-2xl">
			<h1 className="text-2xl font-bold mb-4">Upload Post</h1>
			<form onSubmit={handleSubmit} className="form-control max-w-sm ">
				{/* <div className="mb-4">
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
				</div> */}
				<div className="mb-4">
					<label htmlFor="tags" className="label">
						<span className="label-text">Tags (optional):</span>
						<span className="label-text-alt">Seperate tags with space</span>
					</label>
					<input
						type="text"
						id="tags"
						className="input input-bordered w-full"
						value={tags}
						onChange={(e) => setTags(e.target.value)}
					/>
				</div>
				<div className="w-300 h-300 overflow:auto ">
				<ImageUpload />
				</div>
				<button type="submit" className=" py-5 btn btn-primary rounded-md">
					Upload
				</button>
			</form>
		</div>
		</div>
	);
}

export default UploadPage;
