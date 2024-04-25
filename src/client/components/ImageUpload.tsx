import type React from "react";
import { useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

function ImageUpload() {
	// Explicitly define the type of state as `File | null`
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [fileName, setFileName] = useState<string | null>(null);
	// Handles file selection
	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		event.dataTransfer.dropEffect = "copy";
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();

		const file = event.dataTransfer.files[0];
		setSelectedFile(file);
		setFileName(file.name);

		//set file input value to the dropped file
		if (fileInputRef.current) {
			fileInputRef.current.files = event.dataTransfer.files;
		}
	};
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setSelectedFile(event.target.files[0]);
			setFileName(event.target.files[0].name);
			console.log(event.target.files[0]);
		} else {
			setSelectedFile(null); // Ensure state is reset if no file is selected
			setFileName(null);
			console.log("No file selected");
		}
	};

	return (
		<div className="join join-vertical">
			<div
				className="p-10 join-item border-2 border-dashed bg-base-300 rounded-lg text-center cursor-pointer flex items-center justify-center"
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				onClick={() => fileInputRef.current?.click()}
				onKeyDown={() => fileInputRef.current?.click()}
			>
				<input
					className="join-item hidden"
					type="file"
					ref={fileInputRef}
					onChange={handleFileChange}
					required
				/>
				<div className="flex flex-col items-center justify-center">
          <Icon icon="mdi:upload" className="text-6xl" />
					<p className="text-lg text-accent-content">
						Click to upload or drag & Drop
					</p>
					{fileName && <p className="text-sm font-light italic">{fileName}</p>}
					<p className="text-sm font-light italic">PNG JPG or SVG</p>
				</div>
			</div>
		</div>
	);
}

export default ImageUpload;
