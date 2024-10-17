import { and, eq, isNotNull } from "drizzle-orm";
import OpenAI, { toFile } from "openai";

import { rfps } from "~/server/db/schema";
import { type CreateRFPInput, type UpdateRFPInput } from "~/validators/rfp";

import { db } from "../db";
import { getCurrentUser } from "./user";

export async function listPublishedRFPs() {
  return db.select().from(rfps).where(isNotNull(rfps.publishedAt));
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function createRFP(input: CreateRFPInput) {
  const user = await getCurrentUser();
  const response = await fetch(input.fileUrl);
  const fileBlob = await response.blob();
  const uploadedFile = await openai.files.create({
    file: await toFile(fileBlob, "rfp_document.pdf", {
      type: "application/pdf",
    }),
    purpose: "assistants",
  });
  const thread = await openai.beta.threads.create();
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: `
      Extract data from the attached RFP document and return the following JSON format:
      {
        "budget": "500k - 800k USD",
        "category": "Software Development",
        "companyName": "Acme Corp",
        "contactEmail": "info@acme.com",
        "deadline": "2024-01-01"
        "description": "We are looking for a vendor to build a website for us.",
        "location": "New York, NY",
        "subCategory": "Web Development",
        "tags": ["web", "development", "design"],
        "title": "Website Development",
      }
    `,
    attachments: [
      {
        file_id: uploadedFile.id,
        tools: [{ type: "file_search" }],
      },
    ],
  });
  const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: "asst_VylZPsu4N5pOk9pBHsjaZ7Dw",
  });
  let rfpData;
  if (run.status === "completed") {
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    const [message] = messages.data;
    if (message && message.content[0]?.type === "text") {
      rfpData = message.content[0].text.value;
    }
  }
  if (!rfpData) throw new Error("Failed to extract RFP content");
  rfpData = rfpData
    .replace(/^```json/, "")
    .replace(/```$/, "")
    .trim();
  let parsedData;
  try {
    parsedData = JSON.parse(rfpData) as Record<string, unknown>;
  } catch (error) {
    console.log("Failed to parse RFP data:", rfpData);
    console.error("Failed to parse RFP data:", error);
    throw new Error("Invalid RFP data format");
  }
  const [rfp] = await db
    .insert(rfps)
    .values({
      userId: user.id,
      title: parsedData.title as string,
      data: { ...parsedData, fileUrl: input.fileUrl },
    })
    .returning({ id: rfps.id });
  return rfp;
}

export async function getRFPById(id: string) {
  const [rfp] = await db.select().from(rfps).where(eq(rfps.id, id));
  return rfp;
}

export async function updateRFP(input: UpdateRFPInput) {
  const user = await getCurrentUser();
  const [updatedRfp] = await db
    .update(rfps)
    .set({ data: input.data })
    .where(and(eq(rfps.id, input.id), eq(rfps.userId, user.id)))
    .returning();
  return updatedRfp;
}

export async function publishRFP(id: string) {
  const user = await getCurrentUser();
  await db
    .update(rfps)
    .set({ publishedAt: new Date() })
    .where(and(eq(rfps.id, id), eq(rfps.userId, user.id)))
    .returning();
}

export async function unpublishRFP(id: string) {
  const user = await getCurrentUser();
  await db
    .update(rfps)
    .set({ publishedAt: null })
    .where(and(eq(rfps.id, id), eq(rfps.userId, user.id)))
    .returning();
}
