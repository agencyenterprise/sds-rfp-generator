import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import OpenAI from "openai";
import { TRPCError } from "@trpc/server";
import { env } from "~/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const GenerateRFPInput = z.object({
  projectOverview: z.string().optional(),
  companyBackground: z.string().optional(),
  projectScope: z.string().optional(),
  budget: z.string().optional(),
  techRequirements: z.string().optional(),
  functionalRequirements: z.string().optional(),
  timeline: z.string().optional(),
  experience: z.string().optional(),
  portfolio: z.string().optional(),
  references: z.string().optional(),
  selectionCriteria: z.string().optional(),
  riskManagement: z.string(),
  compliance: z.string().optional(),
  supportMaintenance: z.string().optional(),
});

export type GenerateRFPInput = z.infer<typeof GenerateRFPInput>;

export const rfpRouter = createTRPCRouter({
  generate: publicProcedure
    .input(GenerateRFPInput)
    .mutation(async ({ input }) => {
      const prompt = `
        Generate a detailed Request for Proposal (RFP) based on the following information:
        Project Overview: ${input.projectOverview}
        Company Background: ${input.companyBackground}
        Project Scope: ${input.projectScope}
        Budget: ${input.budget}
        Technical Requirements: ${input.techRequirements}
        Functional Requirements: ${input.functionalRequirements}
        Timeline: ${input.timeline}
        Required Experience: ${input.experience}
        Portfolio Requirement: ${input.portfolio}
        References Required: ${input.references}
        Selection Criteria: ${input.selectionCriteria}
        Risk Management: ${input.riskManagement}
        Compliance Requirements: ${input.compliance}
        Support and Maintenance: ${input.supportMaintenance}

        Please format the RFP in a professional manner, MD format, including all relevant sections.
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
      });

      const rfpContent = completion.choices[0]?.message?.content;

      if (!rfpContent) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate RFP",
        });
      }

      return { rfp: rfpContent };
    }),
});
