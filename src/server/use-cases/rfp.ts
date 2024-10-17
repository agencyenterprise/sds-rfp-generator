import { and, eq, isNotNull, or, sql } from "drizzle-orm";
import { toFile } from "openai";

import { rfps } from "~/server/db/schema";
import { type CreateRFPInput, type UpdateRFPInput } from "~/validators/rfp";

import { db } from "../db";
import { openai } from "../gateways/openai";
import { sleep } from "../utils/sleep";
import { getCurrentUser } from "./user";

export async function listPublishedRFPs(
  searchTerm?: string,
  page = 1,
  pageSize = 25,
) {
  const searchTermLower = searchTerm?.toLowerCase();
  const offset = (page - 1) * pageSize;
  const whereClause = and(
    isNotNull(rfps.publishedAt),
    searchTermLower
      ? or(
          sql`LOWER(title) LIKE ${`%${searchTermLower}%`}`,
          sql`LOWER(CAST(data AS TEXT)) LIKE ${`%${searchTermLower}%`}`,
        )
      : undefined,
  );
  const [totalCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(rfps)
    .where(whereClause);
  const results = await db
    .select()
    .from(rfps)
    .where(whereClause)
    .limit(pageSize)
    .offset(offset);
  return {
    data: results,
    pagination: {
      currentPage: page,
      pageSize,
      totalCount: totalCount?.count ?? 0,
      totalPages: Math.ceil((totalCount?.count ?? 0) / pageSize),
    },
  };
}

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
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: "asst_VylZPsu4N5pOk9pBHsjaZ7Dw",
  });
  let rfpData;
  while (run.status !== "completed") {
    await sleep(1000);
    const updatedRun = await openai.beta.threads.runs.retrieve(
      thread.id,
      run.id,
    );
    if (updatedRun.status === "completed") {
      const messages = await openai.beta.threads.messages.list(thread.id);
      const [message] = messages.data;
      if (message && message.content[0]?.type === "text") {
        rfpData = message.content[0].text.value;
      }
      break;
    } else if (updatedRun.status === "failed") {
      throw new Error("OpenAI run failed");
    }
  }
  if (!rfpData) throw new Error("Failed to extract RFP content");
  const jsonRegex = /\{[\s\S]*\}/;
  const jsonMatch = jsonRegex.exec(rfpData);
  rfpData = jsonMatch ? jsonMatch[0] : rfpData;
  let parsedData: Record<string, unknown> = {};
  try {
    parsedData = JSON.parse(rfpData) as Record<string, unknown>;
  } catch {
    console.log("Failed to parse RFP data:", rfpData);
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
