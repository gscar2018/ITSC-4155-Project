import React, { useRef, useState } from "react";

function ImageUpload({ onUploadSuccess }: { onUploadSuccess: () => void }) {
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

  // Handles the upload action
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("/api/upload", {
        // Use your actual upload URL here
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Image uploaded successfully");
        setSelectedFile(null); // Optionally, clear the selected file here
        onUploadSuccess(); // Trigger refresh after successful upload
      } else {
        alert("Upload failed 1");
      }
    } catch (error) {
      console.error("Error during upload:", error);
      alert("Upload failed 2");
    }
  };

  return (
    <div className="join join-vertical">
      <div
        className="p-10 join-item border-2 border-dashed bg-base-300 rounded-lg text-center cursor-pointer flex items-center justify-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          className="join-item hidden"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div className="flex flex-col">
          <p className="text-lg text-accent-content">
            Click to upload or drag & Drop
          </p>
          {fileName && <p className="text-sm font-light italic">{fileName}</p>}
          <p className="text-sm font-light italic">PNG JPG or SVG</p>
        </div>
      </div>
      <button
        className="join-item rounded-r-lg btn btn-accent text-accent-content font-bold py-2 px-4 border rounded"
        onClick={handleUpload}
      >
        Upload Image
      </button>
    </div>
  );
}

export default ImageUpload;
