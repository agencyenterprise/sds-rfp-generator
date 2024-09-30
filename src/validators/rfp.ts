import { z } from "zod";

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
