import { z } from "zod";

export const RFPIdInput = z.object({
  id: z.string(),
});

export type RFPIdInput = z.infer<typeof RFPIdInput>;

export const GenerateRFPInput = z.object({
  problemToSolve: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  investmentRange: z.string().optional(),
  hardRequirements: z.string().optional(),
  softRequirements: z.string().optional(),
  evaluationCriteria: z.string().optional(),
  mostImportantCriteria: z.string().optional(),
});

export type GenerateRFPInput = z.infer<typeof GenerateRFPInput>;

export const UpdateRFPInput = z.object({
  id: z.string(),
  data: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    budget: z.string().min(1, "Budget is required"),
    category: z.string().min(1, "Category is required"),
    subCategory: z.string().min(1, "Sub-category is required"),
    companyName: z.string().min(1, "Company name is required"),
    contactEmail: z.string().email("Invalid email address"),
    deadline: z.string().min(1, "Deadline is required"),
    location: z.string().min(1, "Location is required"),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    fileUrl: z.string().min(1, "File URL is required"),
  }),
});

export type UpdateRFPInput = z.infer<typeof UpdateRFPInput>;

export const CreateRFPInput = z.object({
  fileUrl: z.string(),
});

export type CreateRFPInput = z.infer<typeof CreateRFPInput>;
