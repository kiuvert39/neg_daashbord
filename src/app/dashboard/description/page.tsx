"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { homepageService } from "@/services/homepage";

// Zod schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  buttonText: z.string().min(2, "Button text is required."),
  link: z.string().url("Please provide a valid URL or relative path (e.g. /learn-more)").or(z.string().startsWith("/")),
});

// Inferred TypeScript type
type FormData = z.infer<typeof formSchema>;

export default function DashboardForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage("");

    try {
      const res = await homepageService.createDes(data)

      setMessage("✅ Submitted successfully!");
      reset();
    } catch (err) {
      setMessage("❌ Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          ✏️ Submit New Description
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              {...register("title")}
              placeholder="e.g. What is NEG?"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && <p className="text-red-500 pt-12 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register("description")}
              placeholder="Enter a detailed description..."
              rows={5}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Button Text</label>
              <input
                {...register("buttonText")}
                placeholder="e.g. Learn More"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.buttonText && (
                <p className="text-red-500 text-sm mt-1">{errors.buttonText.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Link</label>
              <input
                {...register("link")}
                placeholder="e.g. /learn-approach"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {message && (
            <p
              className={`text-center mt-4 text-sm font-medium ${
                message.includes("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
