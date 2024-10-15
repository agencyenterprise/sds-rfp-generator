import { auth } from "@clerk/nextjs/server";
import { and, eq, isNotNull } from "drizzle-orm";

import { rfps, users } from "~/server/db/schema";
import { generateRFP } from "~/server/use-cases/generate-rfp";
import { type GenerateRFPInput, type SaveRFPInput } from "~/validators/rfp";

import { db } from "../db";

export async function listPublishedRFPs() {
  return db.select().from(rfps).where(isNotNull(rfps.publishedAt));
}

export async function generateNewRFP(input: GenerateRFPInput) {
  const { userId } = auth().protect();
  const rfpContent = await generateRFP(input);
  if (!rfpContent) throw new Error("Failed to generate RFP");
  const [user] = await db.select().from(users).where(eq(users.userId, userId));
  const [rfp] = await db
    .insert(rfps)
    .values({
      userId: user!.id,
      data: {
        file: rfpContent,
      },
    })
    .returning({ id: rfps.id });
  return rfp;
}

export async function getRFPById(id: string) {
  const [rfp] = await db.select().from(rfps).where(eq(rfps.id, id));
  return rfp;
}

export async function saveRFP(input: SaveRFPInput) {
  const { userId } = auth().protect();
  const [user] = await db.select().from(users).where(eq(users.userId, userId));
  const [updatedRfp] = await db
    .update(rfps)
    .set({ data: input.data })
    .where(and(eq(rfps.id, input.id), eq(rfps.userId, user!.id)))
    .returning();
  return updatedRfp;
}

export async function publishRFP(id: string) {
  const { userId } = auth().protect();
  const [user] = await db.select().from(users).where(eq(users.userId, userId));
  const [updatedRfp] = await db
    .update(rfps)
    .set({ publishedAt: new Date() })
    .where(and(eq(rfps.id, id), eq(rfps.userId, user!.id)))
    .returning();
  return updatedRfp;
}
