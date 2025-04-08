"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { homepageService } from "@/services/homepage";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const faqSchema = z.object({
  question: z.string().min(5, "Question is too short"),
  answer: z.string().min(5, "Answer is too short"), // even if disabled, include it for completeness
});

type FaqForm = z.infer<typeof faqSchema>;

const UpdateFaqPage = () => {
  const router = useRouter();
  const params = useParams(); // 👈 the correct way now
  const id = params.id as string; // may need type cast
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FaqForm>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  useEffect(() => {
    homepageService
      .getFaqById(id)
      .then((response) => {
        setValue("question", response.question);
        setValue("answer", response.answer);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching FAQ:", err);
        setLoading(false);
      });
  }, [id, setValue]);

  const onSubmit = async (data: FaqForm) => {
    try {
      await homepageService.updateFaq(id, {
        question: data.question,
        answer: data.answer, // will be unchanged but still sent
      });
      toast.success("FAQ updated successfully");
      router.push("/dashboard/faqs");
    } catch (error) {
      toast.error("Failed to update FAQ");
      console.error("Error updating FAQ:", error);
    }
  };

  // Delete FAQ logic
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      try {
        await homepageService.deleteFaq(id);
        toast.success("FAQ deleted successfully");
        router.push("/dashboard/faqs"); // Redirect to FAQ list page
      } catch (error) {
        toast.error("Failed to delete FAQ");
        console.error("Error deleting FAQ:", error);
      }
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mt-32 mx-auto p-6 bg-white rounded-lg shadow"
    >
      {/* Delete Button at Top Right */}
      <div className="absolute top-4 mt-24 right-4">
        <Button
          type="button"
          onClick={handleDelete}
          disabled={isSubmitting}
          className="py-2 px-4 bg-red-500 text-white rounded-lg  cursor-pointer hover:bg-red-600 focus:ring-2 focus:ring-red-500 transition duration-300"
        >
          {isSubmitting ? "Deleting..." : "Delete FAQ"}
        </Button>
      </div>

      <h1 className="text-2xl font-semibold text-gray-800">Update FAQ</h1>

      {/* Question */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Question
        </label>
        <input
          type="text"
          disabled
          {...register("question")}
          className="mt-1 block w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300"
        />
        {errors.question && (
          <p className="text-sm text-red-500 mt-1">
            {errors.question.message}
          </p>
        )}
      </div>

      {/* Answer */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Answer
        </label>
        <textarea
          rows={4}
          {...register("answer")}
          className="mt-1 block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
        />
        {errors.answer && (
          <p className="text-sm text-red-500 mt-1">{errors.answer.message}</p>
        )}
      </div>

      {/* Update Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-300"
      >
        {isSubmitting ? "Updating..." : "Update FAQ"}
      </Button>
    </form>
  );
};

export default UpdateFaqPage;
