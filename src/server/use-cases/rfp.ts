import { and, eq, isNotNull, isNull, or, sql } from "drizzle-orm";
import { toFile } from "openai";

import { rfps } from "~/server/db/schema";
import {
  type CreateRFPInput,
  type RFPData,
  type UpdateRFPInput,
} from "~/validators/rfp";

import { db } from "../db";
import { openai } from "../gateways/openai";
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
  const thread = await openai.beta.threads.create({
    messages: [
      {
        role: "user",
        content: `
          - Extract data from the attached RFP document and return it in JSON format. 
          - Example output:
          {
            "budget": "500k - 800k USD",
            "category": "Software Development",
            "company": "Acme Corp",
            "contactEmail": "info@acme.com",
            "deadline": "2024-10-20T17:00:00-07:00",
            "description": "We are looking for a vendor to build a website for us.",
            "location": "New York, NY",
            "tags": [
              "web",
              "development",
              "design"
            ],
            "title": "Website Development"
          }
        `,
        attachments: [
          {
            file_id: uploadedFile.id,
            tools: [{ type: "file_search" }],
          },
        ],
      },
    ],
  });
  const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: "asst_VylZPsu4N5pOk9pBHsjaZ7Dw",
  });
  const messages = await openai.beta.threads.messages.list(thread.id, {
    run_id: run.id,
  });
  const message = messages.data.pop()!;
  let rfpContent = "";
  if (message.content?.[0]?.type === "text") {
    const { text } = message.content[0];
    const { value } = text;
    rfpContent = value;
  }
  const jsonRegex = /\{[\s\S]*\}/;
  const jsonMatch = jsonRegex.exec(rfpContent);
  rfpContent = jsonMatch ? jsonMatch[0] : rfpContent;
  let parsedData: Record<string, unknown> = {};
  try {
    parsedData = JSON.parse(rfpContent) as Record<string, unknown>;
  } catch {
    console.log("Failed to parse RFP data:", rfpContent);
  }
  const [rfp] = await db
    .insert(rfps)
    .values({
      userId: user.id,
      title: parsedData.title as string,
      data: { ...parsedData, fileUrl: input.fileUrl } as RFPData,
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

export async function deleteRFP(id: string) {
  const user = await getCurrentUser();
  await db
    .delete(rfps)
    .where(
      and(eq(rfps.id, id), eq(rfps.userId, user.id), isNull(rfps.publishedAt)),
    );
}
