"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  dashboardFormSchema,
  type DashboardFormSchema,
} from "@/lib/validationSchema";
import { optinService } from "@/services/optin";
import toast from "react-hot-toast";

const DashboardForm = () => {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [testimonials, setTestimonials] = useState([
    { name: "", position: "", text: "" },
  ]);
  const [teamMembers, setTeamMembers] = useState([
    {
      name: "",
      role: "",
      img: "",
      file: null as File | null,
      experience: "",
      education: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<DashboardFormSchema>({
    resolver: zodResolver(dashboardFormSchema),
    defaultValues: {
      heroTitle: "",
      heroHighlight: "",
      heroDescription: "",
      testimonials: [],
      teamMembers: [],
      galleryImages: [],
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    const updated = [...images, ...imageFiles];
    setImages(updated);
    setValue(
      "galleryImages",
      updated.map((i) => i.file)
    );
  };

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    setValue(
      "galleryImages",
      updated.map((i) => i.file)
    );
  };

  const handleInputChange = (
    type: "testimonial" | "team",
    index: number,
    field: string,
    value: string
  ) => {
    if (type === "testimonial") {
      const updated = [...testimonials];
      (updated[index] as any)[field] = value;
      setTestimonials(updated);
      setValue("testimonials", updated);
    } else {
      const updated = [...teamMembers];
      (updated[index] as any)[field] = value;
      setTeamMembers(updated);
      setValue("teamMembers", updated);
    }
  };

  const handleTeamImageUpload = (index: number, file: File) => {
    const preview = URL.createObjectURL(file);
    const updated = [...teamMembers];
    updated[index].img = preview;
    updated[index].file = file;
    setTeamMembers(updated);
    setValue("teamMembers", updated);
  };

  const addTestimonial = () => {
    const updated = [...testimonials, { name: "", position: "", text: "" }];
    setTestimonials(updated);
    setValue("testimonials", updated);
  };

  const removeTestimonial = (index: number) => {
    const updated = testimonials.filter((_, i) => i !== index);
    setTestimonials(updated);
    setValue("testimonials", updated);
  };

  const addTeamMember = () => {
    const updated = [
      ...teamMembers,
      {
        name: "",
        role: "",
        img: "",
        file: null,
        experience: "",
        education: "",
      },
    ];
    setTeamMembers(updated);
    setValue("teamMembers", updated);
  };

  const removeTeamMember = (index: number) => {
    const updated = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updated);
    setValue("teamMembers", updated);
  };

  const onSubmit = async (data: DashboardFormSchema) => {
    setIsLoading(true);

    const payload = {
      heroTitle: data.heroTitle,
      heroHighlight: data.heroHighlight,
      heroDescription: data.heroDescription,
      testimonials: testimonials,
      teamMembers: teamMembers,
    };

    const formData = new FormData();

    // Instead of accessing undefined variables, use data fields:
    formData.append("data", JSON.stringify(payload));

    images.forEach((img, idx) => {
      formData.append(`galleryImages[${idx}]`, img.file);
    });

    teamMembers.forEach((member, idx) => {
      if (member.file) {
        formData.append(`teamMembersImages[${idx}]`, member.file);
      }
    });

    try {
      console.log("Form Data:", data);
      const res = await optinService.createOptin(formData);

      toast.success("Form submitted successfully!");
    } catch (err) {
      toast.error("Failed to submit the form.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-6xl mx-auto p-8 bg-white rounded-3xl shadow-xl space-y-12"
    >
      <h2 className="text-4xl font-bold text-gray-800 text-center">
        upload optin page information
      </h2>

      {/* Carousel Images Upload Section */}
      <section>
        <label className="block text-xl font-semibold mb-4 text-gray-700">
          Carousel Images
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden rounded-xl shadow"
            >
              <img
                src={img.preview}
                className="w-full h-32 object-cover"
                alt="preview"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-2 right-2 bg-red-600 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-600 file:px-4 file:py-2 file:bg-blue-50 file:text-blue-700 file:rounded-lg file:border-0 hover:file:bg-blue-100"
        />
        <p className="text-sm text-gray-500 mt-1">
          Upload images for the homepage carousel. JPG, PNG allowed.
        </p>
        {errors.galleryImages && (
          <p className="text-sm text-red-500 mt-1">
            {errors.galleryImages.message as string}
          </p>
        )}
      </section>

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="heroTitle"
            className="block text-gray-700 font-medium mb-1"
          >
            Hero Title
          </label>
          <input
            {...register("heroTitle")}
            type="text"
            id="heroTitle"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your hero title"
          />
          {errors.heroTitle && (
            <p className="text-sm text-red-500 mt-1">
              {errors.heroTitle.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="heroHighlight"
            className="block text-gray-700 font-medium mb-1"
          >
            Hero Highlight
          </label>
          <input
            {...register("heroHighlight")}
            type="text"
            id="heroHighlight"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            placeholder="Key phrase to highlight"
          />
          {errors.heroHighlight && (
            <p className="text-sm text-red-500 mt-1">
              {errors.heroHighlight.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="heroDescription"
            className="block text-gray-700 font-medium mb-1"
          >
            Hero Description
          </label>
          <textarea
            {...register("heroDescription")}
            id="heroDescription"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 min-h-[120px]"
            placeholder="Brief paragraph that explains your offering"
          />
          {errors.heroDescription && (
            <p className="text-sm text-red-500 mt-1">
              {errors.heroDescription.message}
            </p>
          )}
        </div>
      </div>

      {/* Testimonials */}
      <section>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-2xl font-semibold">Testimonials</h3>
          <button
            type="button"
            onClick={addTestimonial}
            className="text-blue-600 text-sm hover:underline cursor-pointer"
          >
            + Add
          </button>
        </div>
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl mb-6 shadow"
          >
            <input
              type="text"
              placeholder="Name"
              value={t.name}
              onChange={(e) =>
                handleInputChange("testimonial", i, "name", e.target.value)
              }
              className="p-3 rounded-xl border border-gray-300"
            />
            <input
              type="text"
              placeholder="Position"
              value={t.position}
              onChange={(e) =>
                handleInputChange("testimonial", i, "position", e.target.value)
              }
              className="p-3 rounded-xl border border-gray-300"
            />
            <textarea
              placeholder="Testimonial Text"
              value={t.text}
              onChange={(e) =>
                handleInputChange("testimonial", i, "text", e.target.value)
              }
              className="p-3 rounded-xl border border-gray-300 md:col-span-2 resize-none"
              rows={3}
            />
            <button
              type="button"
              onClick={() => removeTestimonial(i)}
              className="text-red-600 text-sm hover:underline md:col-span-2 cursor-pointer"
            >
              Remove Testimonial
            </button>
          </div>
        ))}
        {errors.testimonials && (
          <p className="text-sm text-red-500">
            {errors.testimonials.message as string}
          </p>
        )}
      </section>

      {/* Team Members */}
      <section>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-2xl font-semibold">Team Members</h3>
          <button
            type="button"
            onClick={addTeamMember}
            className="text-blue-600 text-sm hover:underline cursor-pointer"
          >
            + Add
          </button>
        </div>
        {teamMembers.map((member, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl mb-6 shadow"
          >
            <input
              type="text"
              placeholder="Name"
              value={member.name}
              onChange={(e) =>
                handleInputChange("team", i, "name", e.target.value)
              }
              className="p-3 rounded-xl border border-gray-300"
            />
            <input
              type="text"
              placeholder="Role"
              value={member.role}
              onChange={(e) =>
                handleInputChange("team", i, "role", e.target.value)
              }
              className="p-3 rounded-xl border border-gray-300"
            />
            <input
              type="text"
              placeholder="Experience"
              value={member.experience}
              onChange={(e) =>
                handleInputChange("team", i, "experience", e.target.value)
              }
              className="p-3 rounded-xl border border-gray-300"
            />
            <input
              type="text"
              placeholder="Education"
              value={member.education}
              onChange={(e) =>
                handleInputChange("team", i, "education", e.target.value)
              }
              className="p-3 rounded-xl border border-gray-300"
            />
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0])
                    handleTeamImageUpload(i, e.target.files[0]);
                }}
                className="text-sm text-gray-600 file:py-2 file:px-4 file:bg-green-50 file:text-green-700 file:rounded-lg file:border-0 hover:file:bg-green-100"
              />
              {member.img && (
                <img
                  src={member.img}
                  alt="Team Member"
                  className="w-24 h-24 object-cover rounded-full border mt-2"
                />
              )}
            </div>
            <button
              type="button"
              onClick={() => removeTeamMember(i)}
              className="text-red-600 text-sm hover:underline md:col-span-2 cursor-pointer"
            >
              Remove Member
            </button>
          </div>
        ))}
        {errors.teamMembers && (
          <p className="text-sm text-red-500">
            {errors.teamMembers.message as string}
          </p>
        )}
      </section>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 cursor-pointer text-white py-4 rounded-2xl text-lg font-semibold shadow-md hover:bg-blue-700 transition"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default DashboardForm;
