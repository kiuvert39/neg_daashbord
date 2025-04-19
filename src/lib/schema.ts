import { z } from "zod";

// Define the Zod schema for the footer form
export const FooterFormSchema = z.object({
  brandName: z.string().min(1, "Brand Name is required"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone number is required"),
  legalNoticeLink: z.string().url("Invalid URL format").optional(),
  socialLinks: z.object({
    linkedin: z.string().url("Invalid URL format").optional(),
    instagram: z.string().url("Invalid URL format").optional(),
    facebook: z.string().url("Invalid URL format").optional(),
  }),
});

export type FooterFormData = z.infer<typeof FooterFormSchema>;
