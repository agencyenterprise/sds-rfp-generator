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

export const RFPData = z.object({
  description: z.string().min(1, "Description is required"),
  budget: z.string().min(1, "Budget is required"),
  category: z.string().min(1, "Category is required"),
  company: z.string().min(1, "Company name is required"),
  deadline: z.string().optional(),
  tags: z.array(z.string()).optional(),
  fileUrl: z.string().optional(),
  contactEmail: z.string().email("Invalid email address"),
  location: z.string().optional(),
});

export type RFPData = z.infer<typeof RFPData>;

export const UpdateRFPInput = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  data: RFPData,
});

export type UpdateRFPInput = z.infer<typeof UpdateRFPInput>;

export const CreateRFPInput = z.object({
  fileUrl: z.string(),
});

export type CreateRFPInput = z.infer<typeof CreateRFPInput>;

export const SearchRFPsInput = z.object({
  searchTerm: z.string(),
});

export type SearchRFPsInput = z.infer<typeof SearchRFPsInput>;

export const ListRFPsInput = z.object({
  searchTerm: z.string().optional(),
  page: z.number().default(1),
  pageSize: z.number().default(10),
});

export type ListRFPsInput = z.infer<typeof ListRFPsInput>;
