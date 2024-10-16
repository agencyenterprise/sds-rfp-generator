import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";

import { env } from "~/env";
import { type GenerateRFPInput } from "~/validators/rfp";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function generateRFP(input: GenerateRFPInput) {
  auth().protect();
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
  return rfpContent;
}
