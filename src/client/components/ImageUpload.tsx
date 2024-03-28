import React, { useState } from "react";

function ImageUpload() {
  // Explicitly define the type of state as `File | null`
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handles file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      console.log(event.target.files[0]);
    } else {
      setSelectedFile(null); // Ensure state is reset if no file is selected
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
      } else {
        alert("Upload failed 1 ");
      }
    } catch (error) {
      console.error("Error during upload:", error);
      alert("Upload failed 2 ");
    }
  };

  return (
    <div className="join" style={{ backgroundColor: '#000', padding: '20px', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
      <input
        className="join-item file-input file-input-bordered file-input-primary w-full max-w-xs"
        type="file"
        onChange={handleFileChange}
        style={{ marginRight: '10px', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#333', color: '#fff' }}
      />
      <button
        className="join-item rounded-r-lg btn bg-primary text-white font-bold py-2 px-4 border rounded"
        onClick={handleUpload}
        style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#4CAF50', color: '#fff', cursor: 'pointer' }}
      >
        Upload Image
      </button>
    </div>
  );
  
}

export default ImageUpload;
