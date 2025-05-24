'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { homepageService } from '@/services/homepage';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

type FormData = z.infer<typeof formSchema>;

const MorningForm = () => {
  const [greeting, setGreeting] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

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

  const onSubmit = async (data: FormData) => {
    try {
      await homepageService.createProject(data);
      reset();
      toast.success('project created!');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create post');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 p-6 flex items-center justify-center">
      <div className="p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          {greeting}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register('title')}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
              placeholder="Enter title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="content" className="block text-gray-700 text-sm font-medium mb-2">
              Content
            </label>
            <textarea
              id="content"
              rows={4}
              {...register('content')}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none resize-none"
              placeholder="Write description here..."
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:from-blue-500 hover:to-blue-600 transition duration-200 transform hover:-translate-y-1"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MorningForm;
