"use client";

import { useState } from "react";
import { FooterFormData, FooterFormSchema } from "@/lib/schema"; // Adjust the import path as necessary
import { z } from "zod";

interface FooterAdminFormProps {
  initialFooterData: FooterFormData;
  onSubmit: (data: FooterFormData) => void;
}

const FooterAdminForm: React.FC<FooterAdminFormProps> = ({ initialFooterData, onSubmit }) => {
  const [formData, setFormData] = useState<FooterFormData>(initialFooterData);
  const [errors, setErrors] = useState<Record<string, string | Record<string, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [name]: value,
      },
    });
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({}); // Reset errors

    // Validate using Zod
    try {
      FooterFormSchema.parse(formData); // This will throw an error if validation fails
      onSubmit(formData); // Call the onSubmit function passed from the parent
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
      <div>
        <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">Brand Name</label>
        <input
          type="text"
          id="brandName"
          name="brandName"
          value={formData.brandName}
          onChange={handleChange}
          className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {typeof errors.brandName === "string" && <p className="text-red-500 text-sm">{errors.brandName}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {typeof errors.address === "string" && <p className="text-red-500 text-sm">{errors.address}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {typeof errors.email === "string" && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {typeof errors.phone === "string" && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="legalNoticeLink" className="block text-sm font-medium text-gray-700">Legal Notice Link</label>
        <input
          type="text"
          id="legalNoticeLink"
          name="legalNoticeLink"
          value={formData.legalNoticeLink || ""}
          onChange={handleChange}
          className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {typeof errors.legalNoticeLink === "string" && <p className="text-red-500 text-sm">{errors.legalNoticeLink}</p>}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700">Social Links</h3>
        <div className="space-y-4 mt-4">
          {["linkedin", "instagram", "facebook"].map((social) => (
            <div key={social}>
              <label htmlFor={social} className="block text-sm font-medium text-gray-700 capitalize">{social}</label>
              <input
                type="url"
                id={social}
                name={social}
                value={formData.socialLinks[social as keyof typeof formData.socialLinks] || ""}
                onChange={handleSocialChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {typeof errors.socialLinks === "object" && errors.socialLinks[social] && (
                <p className="text-red-500 text-sm">{errors.socialLinks[social]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-500 text-white"} rounded-md hover:bg-teal-600`}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default FooterAdminForm;
