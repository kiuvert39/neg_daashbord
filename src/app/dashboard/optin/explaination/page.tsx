"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { optinService } from "@/services/optin";

const heroSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description1: z.string().min(1, "Description 1 is required"),
  description2: z.string().min(1, "Description 2 is required"),
  buttonText: z.string().min(1, "Button Text is required"),
  buttonLink: z.string().url("Button Link must be a valid URL").or(z.literal("")),
});

type HeroFormData = z.infer<typeof heroSchema>;

export default function HeroSectionForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<HeroFormData>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      title: "",
      description1: "",
      description2: "",
      buttonText: "",
      buttonLink: "",
    },
  });

  const onSubmit = async (data: HeroFormData) => {
    setLoading(true);
    try {


      console.log("Form submitted:", data);
      const result = await optinService.createExaplaination(data)
      console.log("Form submission result:", result);
      // Handle successful form submission (e.g., show a success message)
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
      reset(); // Reset the form after submission
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto mt-12 dark:bg-gray-900 bg-white rounded-2xl p-10 shadow"
    >
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">
        Edit Hero Section
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Title */}
        <div>
          <label className="block text-gray-600 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            {...register("title")}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Button Text */}
        <div>
          <label className="block text-gray-600 dark:text-gray-300 mb-2">
            Button Text
          </label>
          <input
            {...register("buttonText")}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter button text"
          />
          {errors.buttonText && (
            <p className="text-red-500 text-sm mt-1">{errors.buttonText.message}</p>
          )}
        </div>

        {/* Description 1 */}
        <div className="md:col-span-2">
          <label className="block text-gray-600 dark:text-gray-300 mb-2">
            Description 1
          </label>
          <textarea
            {...register("description1")}
            rows={3}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter first description"
          />
          {errors.description1 && (
            <p className="text-red-500 text-sm mt-1">{errors.description1.message}</p>
          )}
        </div>

        {/* Description 2 */}
        <div className="md:col-span-2">
          <label className="block text-gray-600 dark:text-gray-300 mb-2">
            Description 2
          </label>
          <textarea
            {...register("description2")}
            rows={3}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter second description"
          />
          {errors.description2 && (
            <p className="text-red-500 text-sm mt-1">{errors.description2.message}</p>
          )}
        </div>

        {/* Button Link */}
        <div className="md:col-span-2">
          <label className="block text-gray-600 dark:text-gray-300 mb-2">
            Button Link
          </label>
          <input
            {...register("buttonLink")}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="https://example.com"
          />
          {errors.buttonLink && (
            <p className="text-red-500 text-sm mt-1">{errors.buttonLink.message}</p>
          )}
        </div>
      </div>

      <div className="pt-10">
        <button
          type="submit"
          disabled={loading}
          className={`w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-xl shadow-md transition-all duration-200 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
