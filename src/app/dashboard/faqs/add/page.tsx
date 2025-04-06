"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { homepageService } from "@/services/homepage";

// Zod schema
const faqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

type FaqFormValues = z.infer<typeof faqSchema>;

const FaqForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
  });

  const onSubmit = async (data: FaqFormValues) => {
    setLoading(true);

    try {
      // Replace with your actual service
      // await faqService.createFaq(data);

      const response = homepageService.createFaq(data);

      toast.success("FAQ submitted successfully");
      reset();
    } catch (error) {
      toast.error("Failed to submit FAQ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto"
    >
      {/* Question */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Question
        </label>
        <input
          type="text"
          {...register("question")}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300"
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
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300"
        />
        {errors.answer && (
          <p className="text-sm text-red-500 mt-1">{errors.answer.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-300"
      >
        {loading ? "Submitting..." : "Submit FAQ"}
      </Button>
    </form>
  );
};

export default FaqForm;
