import OpenAI from "openai";

import { env } from "~/env";

let openaiInstance: OpenAI | null = null;

export function getOpenAI(): OpenAI {
  if (!openaiInstance) {
    openaiInstance = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });
  }
  return openaiInstance;
}

export const openai = getOpenAI();
