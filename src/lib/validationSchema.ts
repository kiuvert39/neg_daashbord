// schemas/dashboardFormSchema.ts
import { z } from 'zod';

export const dashboardFormSchema = z.object({
  heroTitle: z.string().min(1, 'Hero title is required'),
  heroHighlight: z.string().min(1, 'Hero highlight is required'),
  heroDescription: z.string().min(1, 'Hero description is required'),
  testimonials: z
    .array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        position: z.string().min(1, 'Position is required'),
        text: z.string().min(1, 'Text is required'),
      })
    )
    .min(1, 'At least one testimonial is required'),
  teamMembers: z
    .array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        role: z.string().min(1, 'Role is required'),
        experience: z.string().min(1, 'Experience is required'),
        education: z.string().min(1, 'Education is required'),
        file: z.any().optional(),
      })
    )
    .min(1, 'At least one team member is required'),
  galleryImages: z.array(z.instanceof(File)).min(1, "At least one carousel image is required"),

});

export type DashboardFormSchema = z.infer<typeof dashboardFormSchema>;
