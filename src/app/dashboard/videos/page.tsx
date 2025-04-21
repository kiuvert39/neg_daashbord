"use client";
import React, { useState, useRef } from "react";

const VideoUpload: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!videoFile) return;

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Video uploaded successfully!");
        setVideoFile(null);
        setPreviewUrl(null);
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      alert("An error occurred.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800 dark:text-white">
        Upload Your Video
      </h2>

      {/* Dropzone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-teal-300 rounded-xl p-6 transition hover:bg-teal-50 dark:hover:bg-gray-700"
      >
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          hidden
        />
        <span className="text-teal-600 dark:text-teal-300 font-medium">Click or drag video file here</span>
        <span className="text-sm text-gray-400 mt-2">MP4, WebM or Ogg (max 100MB)</span>
      </div>

      {/* Preview */}
      {previewUrl && (
        <div className="mt-6">
          <video
            src={previewUrl}
            controls
            className="rounded-xl w-full h-64 object-cover"
          />
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!videoFile}
        className="w-full mt-6 cursor-pointer bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {videoFile ? "Upload Video" : "Choose a Video First"}
      </button>
    </div>
  );
};

export default VideoUpload;
