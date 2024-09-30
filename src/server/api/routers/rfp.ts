import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import OpenAI from "openai";
import { TRPCError } from "@trpc/server";
import { env } from "~/env";
import { GenerateRFPInput } from "~/validators/rfp";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const rfpRouter = createTRPCRouter({
  generate: publicProcedure
    .input(GenerateRFPInput)
    .mutation(async ({ input }) => {
      const prompt = `
        Generate a detailed Request for Proposal (RFP) based on the following information:
        Problem to solve: ${input.problemToSolve}
        Start Date: ${input.startDate.toISOString()}
        End Date: ${input.endDate.toISOString()}
        Investment Range: ${input.investmentRange}
        Hard Requirements: ${input.hardRequirements}
        Soft Requirements: ${input.softRequirements}
        Evaluation Criteria: ${input.evaluationCriteria}
        Most Important Criteria: ${input.mostImportantCriteria}

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
