"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { optinService } from "@/services/optin";
import toast from "react-hot-toast";

// Schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  buttonText: z.string().min(1, "Button text is required"),
  imageFile: z
    .instanceof(File)
    .refine((file) => !!file, "Image is required"),
});

type FormDataType = z.infer<typeof formSchema>;

const DashboardForm: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
  });

  const imageFile = watch("imageFile");

  const onSubmit = async (data: FormDataType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("buttonText", data.buttonText);
    formData.append("image", data.imageFile);

    try {
      await optinService.createStory(formData);
      toast.success("Message created successfully!");
      reset(); // ✅ Clears all fields
      setPreviewImage(null);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("imageFile", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mx-auto p-6 space-y-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">Title</label>
          <input
            type="text"
            {...register("title")}
            placeholder="Enter title"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Enter description"
            className="w-full p-3 border border-gray-300 rounded-md"
            rows={5}
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Button Text */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">
            Button Text
          </label>
          <input
            type="text"
            {...register("buttonText")}
            placeholder="Enter button text"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.buttonText && (
            <p className="text-red-600 text-sm mt-1">
              {errors.buttonText.message}
            </p>
          )}
        </div>

        {/* Upload Image */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">
            Upload Image
          </label>
          <div className="relative w-full">
            <input
              id="imageUpload"
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="imageUpload"
              className="flex items-center justify-center w-full px-4 py-3 border border-dashed border-gray-400 rounded-md cursor-pointer hover:bg-gray-100 transition"
            >
              {imageFile ? (
                <span className="text-green-700 font-medium">
                  {(imageFile as File)?.name}
                </span>
              ) : (
                <span className="text-gray-500">Click to upload image</span>
              )}
            </label>
          </div>
          {errors.imageFile && (
            <p className="text-red-600 text-sm mt-1">
              {errors.imageFile.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>

      {/* Live Preview */}
      <div className="mt-12 space-y-8">
        <h2 className="text-2xl font-semibold text-center">Preview</h2>
        <div className="relative bg-gray-100 p-6 rounded-lg min-h-[500px]">
          <div className="text-center">
            <h3 className="text-3xl font-semibold">
              {watch("title") || "Title goes here"}
            </h3>
            <p className="mt-4 text-lg">
              {watch("description") || "Description will appear here."}
            </p>
            <Button className="mt-12 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md">
              {watch("buttonText") || "Button text"}
            </Button>
          </div>

          {previewImage && (
            <div className="mt-8 flex justify-center">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full max-w-md rounded-lg object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardForm;
