"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const footerSchema = z.object({
  brandName: z.string().min(1, "Brand name is required"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone number is required"),
  legalNoticeLink: z.string().url("Enter a valid URL"),
  socialLinks: z.object({
    linkedin: z.string().url("Invalid LinkedIn URL"),
    instagram: z.string().url("Invalid Instagram URL"),
    facebook: z.string().url("Invalid Facebook URL"),
  }),
});

type FooterFormData = z.infer<typeof footerSchema>;

interface FooterAdminFormProps {
  initialData: FooterFormData;
  onSave: (data: FooterFormData) => Promise<void>;
}

export default function FooterAdminForm({
  initialData,
  onSave,
}: FooterAdminFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FooterFormData>({
    resolver: zodResolver(footerSchema),
    defaultValues: initialData,
  });

  const [loading, setLoading] = useState(false);

  const submitHandler = async (data: FooterFormData) => {
    setLoading(true);
    try {
      await onSave(data);
    } catch (err) {
      console.error("Failed to save footer info:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white p-8 rounded-2xl shadow-md space-y-8 max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800">Update Footer Information</h2>

      {/* Brand & Contact Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Brand Name"
          name="brandName"
          placeholder="e.g. Agilery"
          register={register}
          error={errors.brandName?.message}
        />
        <Input
          label="Address"
          name="address"
          placeholder="e.g. Uetlibergstrasse 65, 8045 Zürich"
          register={register}
          error={errors.address?.message}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="e.g. hello@agilery.ch"
          register={register}
          error={errors.email?.message}
        />
        <Input
          label="Phone"
          name="phone"
          placeholder="e.g. +41 (0) 44 688 02 16"
          register={register}
          error={errors.phone?.message}
        />
        <Input
          label="Legal Notice Link"
          name="legalNoticeLink"
          placeholder="e.g. https://agilery.ch/privacy-policy"
          register={register}
          error={errors.legalNoticeLink?.message}
        />
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Social Media Links</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Input
            label="LinkedIn"
            name="socialLinks.linkedin"
            placeholder="e.g. https://linkedin.com/company/agilery"
            register={register}
            error={errors.socialLinks?.linkedin?.message}
          />
          <Input
            label="Instagram"
            name="socialLinks.instagram"
            placeholder="e.g. https://instagram.com/agilery"
            register={register}
            error={errors.socialLinks?.instagram?.message}
          />
          <Input
            label="Facebook"
            name="socialLinks.facebook"
            placeholder="e.g. https://facebook.com/agilery"
            register={register}
            error={errors.socialLinks?.facebook?.message}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-3 rounded-xl font-semibold text-white w-full md:w-auto transition duration-300 ${
            loading
              ? "bg-teal-300 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

// 🌟 Reusable Input Component with placeholder support
interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: any;
  error?: string;
}

const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
}: InputProps) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={name}
      type={type}
      placeholder={placeholder}
      {...register(name as any)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);
