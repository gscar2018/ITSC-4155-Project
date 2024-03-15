import React, { useState } from 'react';

function ImageUpload() {
    // Explicitly define the type of state as `File | null`
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Handles file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        } else {
            setSelectedFile(null); // Ensure state is reset if no file is selected
        }
    };

    // Handles the upload action
    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('/upload', { // Use your actual upload URL here
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Image uploaded successfully');
                setSelectedFile(null); // Optionally, clear the selected file here
            } else {
                alert('Upload failed 1 ');
            }
        } catch (error) {
            console.error('Error during upload:', error);
            alert('Upload failed 2 ');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleUpload}>Upload Image</button>
        </div>
    );
}

export default ImageUpload;
