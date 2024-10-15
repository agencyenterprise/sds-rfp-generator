import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import OpenAI from "openai";
import { TRPCError } from "@trpc/server";
import { env } from "~/env";
import { GenerateRFPInput } from "~/validators/rfp";
import { rfps } from "~/server/db/schema";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const rfpRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(rfps);
  }),
  generate: publicProcedure
    .input(GenerateRFPInput)
    .mutation(async ({ input }) => {
      const prompt = `
        Problem to solve: ${input.problemToSolve}
        Start Date: ${input.startDate?.toISOString()}
        End Date: ${input.endDate?.toISOString()}
        Investment Range: ${input.investmentRange}
        Hard Requirements: ${input.hardRequirements}
        Soft Requirements: ${input.softRequirements}
        Evaluation Criteria: ${input.evaluationCriteria}
        Most Important Criteria: ${input.mostImportantCriteria}
      `;
      const thread = await openai.beta.threads.create();
      await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: prompt,
      });
      const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
        assistant_id: "asst_7tmLzI4958PdqqhiN0jhZKK8",
      });
      let rfpContent = null;
      if (run.status === "completed") {
        const messages = await openai.beta.threads.messages.list(run.thread_id);
        const [message] = messages.data;
        if (message && message.content[0]?.type === "text") {
          rfpContent = message.content[0].text.value;
        }
      }
      if (!rfpContent) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate RFP",
        });
      }
      return { rfp: rfpContent };
    }),
});
