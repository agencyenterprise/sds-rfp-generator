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
  data: z.object({ file: z.string() }),
});

export type UpdateRFPInput = z.infer<typeof UpdateRFPInput>;

export const CreateRFPInput = z.object({
  data: z.object({ file: z.string() }),
});

export type CreateRFPInput = z.infer<typeof CreateRFPInput>;
