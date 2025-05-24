"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { homepageService } from "@/services/homepage";
import toast from "react-hot-toast";

// Zod schema for validation
const uploadSchema = z.object({
  highlight: z.string().min(1, "Highlight is required"),
  description: z.string().min(1, "Description is required"),
  images: z.any().optional(), // We handle image validation separately
});

type UploadFormValues = z.infer<typeof uploadSchema>;

const UploadForm = () => {
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
  });

  const onSubmit = async (data: UploadFormValues) => {
    if (selectedImages.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    setLoading(true);

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("highlight", data.highlight);;
      formDataToSubmit.append("description", data.description);
      selectedImages.forEach((image) =>
        formDataToSubmit.append("images", image)
      );

      await homepageService.createhero(formDataToSubmit);
      toast.success("Data uploaded successfully");

      reset(); // reset form fields
      setSelectedImages([]); // clear uploaded images
    } catch (error) {
      console.log("error",error)
      toast.error("Error uploading data");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const handleImageRemove = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">

      {/* Highlight */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">Headline</label>
        <input
          type="text"
          {...register("highlight")}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300"
        />
        {errors.highlight && (
          <p className="text-sm text-red-500 mt-1">{errors.highlight.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">Description</label>
        <textarea
          {...register("description")}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300"
        />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">Upload Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm file:border-gray-300 file:bg-gray-100 file:px-4 file:py-2 file:rounded-lg file:text-gray-700 hover:file:bg-teal-500 hover:file:text-white transition-all duration-300"
        />
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Uploaded ${index}`}
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
              <button
                type="button"
                onClick={() => handleImageRemove(index)}
                className="absolute top-1 right-1 bg-white p-1 rounded-full text-gray-600 hover:text-red-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        size="lg"
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-300"
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default UploadForm;
