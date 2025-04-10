"use client";
import { Button } from '@/components/ui/button';
import { homepageService } from '@/services/homepage'; 
import React, { useState, useEffect, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define the Zod validation schema
const conceptSchema = z.object({
  heading: z.string().min(1, { message: 'Heading is required' }),
  highlight: z.string().min(1, { message: 'Highlight is required' }),
  description: z.string().min(10, { message: 'Description should be at least 10 characters' }),
  highlightDetails: z.string().min(1, { message: 'Highlight details are required' }),
});

type ConceptFormData = z.infer<typeof conceptSchema>;

const Concept = () => {
  const [greeting, setGreeting] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // for loading status
  
  // Use react-hook-form with zod
  const { control, handleSubmit, setValue, formState } = useForm<ConceptFormData>({
    resolver: zodResolver(conceptSchema),
  });

  const { errors } = formState; // Extracting errors from formState

  // Greeting logic
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

    const interval = setInterval(() => {
      const { text, emoji } = getGreeting();
      setGreeting(`${text} ${emoji}`);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

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

  const onSubmit = async (data: ConceptFormData) => {
    if (!selectedFile) {
      toast.error('Please upload an image before submitting.');
      return;
    }
    setLoading(true); // Show loading status

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('heading', data.heading);
      formDataToSend.append('highlight', data.highlight);
      formDataToSend.append('description', data.description);
      formDataToSend.append('highlightDetails', data.highlightDetails);
      formDataToSend.append('image', selectedFile);

      const response = await homepageService.createConcept(formDataToSend);
      console.log('Backend Response:', response);

      toast.success('Concept created successfully!');
      setImagePreview(null);
      setSelectedFile(null);
    } catch (err) {
      console.error('Error creating concept:', err);
      toast.error('Failed to create concept');
    } finally {
      setLoading(false); // Hide loading status
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-yellow-50 p-6 flex items-center justify-center">
      <div className="p-8 w-full max-w-5xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          {greeting}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="heading" className="block text-gray-700 text-sm font-medium mb-2">Heading</label>
                <Controller
                  name="heading"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="heading"
                      type="text"
                      {...field}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                      placeholder="Enter heading"
                    />
                  )}
                />
                {errors.heading && <span className="text-red-500 mt-7">{errors.heading.message}</span>}
              </div>

              <div>
                <label htmlFor="highlight" className="block text-gray-700 text-sm font-medium mb-2">Highlight</label>
                <Controller
                  name="highlight"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="highlight"
                      type="text"
                      {...field}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                      placeholder="Enter highlight"
                    />
                  )}
                />
                {errors.highlight && <span className="text-red-500">{errors.highlight.message}</span>}
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">Description</label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      id="description"
                      {...field}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 text-gray-900 focus:border-blue-400 outline-none resize-none"
                      placeholder="Write the description..."
                    />
                  )}
                />
                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
              </div>

              <div>
                <label htmlFor="highlightDetails" className="block text-gray-700 text-sm font-medium mb-2">Highlight Details</label>
                <Controller
                  name="highlightDetails"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      id="highlightDetails"
                      {...field}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 text-gray-900 focus:border-blue-400 outline-none resize-none"
                      placeholder="More details on the highlight..."
                    />
                  )}
                />
                {errors.highlightDetails && <span className="text-red-500">{errors.highlightDetails.message}</span>}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="image" className="block text-gray-700 text-sm font-medium mb-2">Upload Image</label>
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
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
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
                  )}
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                type="submit"
                className="w-full cursor-pointer sm:w-auto bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-medium rounded-lg hover:from-indigo-500 hover:to-indigo-700 transition duration-200 transform hover:-translate-y-1"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Concept'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Concept;
