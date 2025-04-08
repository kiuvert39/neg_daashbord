"use client";

import { homepageService } from '@/services/homepage';
import { blogPostService } from '@/services/post.service';
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface FormData {
  title: string;
  content: string;
}

const MorningForm = () => {
  const [greeting, setGreeting] = useState('');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return { text: 'Good Morning', emoji: '☀️' };
      if (hour >= 12 && hour < 17) return { text: 'Good Afternoon', emoji: '🌤️' };
      if (hour >= 17 && hour < 21) return { text: 'Good Evening', emoji: '🌅' };
      return { text: 'Good Night', emoji: '🌙' };
    };

    const { text, emoji } = getGreeting();
    setGreeting(`${text} ${emoji}`);

    // Update greeting every minute
    const interval = setInterval(() => {
      const { text, emoji } = getGreeting();
      setGreeting(`${text} ${emoji}`);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
        console.error('No file selected');
        return;
    }
    try {

      // Here you would typically send the data to your API
      const formPayload = {
        ...formData,
        image: selectedFile as File, // Type assertion since we'll only submit when file exists
      };   

      const response = homepageService.createCaseStudy(formPayload);
      
        setFormData({
            title: '',
            content: '',
        
        });
        setImagePreview(null);
        toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create post');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 p-6 flex items-center justify-center">
      <div className="p-8 w-full max-w-5xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          {greeting}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-2">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition duration-200 outline-none"
                  placeholder="Enter title"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-gray-700 text-sm font-medium mb-2">
                  Content
                </label>
                <textarea
                  id="Content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 text-gray-900 focus:border-blue-400 transition duration-200 outline-none resize-none"
                  placeholder="Write description here..."
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">


            <div>
              <label htmlFor="image" className="block text-gray-700 text-sm font-medium mb-2">
                Upload Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition duration-200 h-[300px]">
                <div className="space-y-1 text-center self-center">
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-48 w-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition duration-200 shadow-lg"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {!imagePreview && (
                    <>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:from-blue-500 hover:to-blue-600 transition duration-200 transform hover:-translate-y-1 mt-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MorningForm; 