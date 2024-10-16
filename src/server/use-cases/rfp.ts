import { and, eq, isNotNull } from "drizzle-orm";

import { rfps } from "~/server/db/schema";
import { type CreateRFPInput, type UpdateRFPInput } from "~/validators/rfp";

import { db } from "../db";
import { getCurrentUser } from "./user";

export async function listPublishedRFPs() {
  return db.select().from(rfps).where(isNotNull(rfps.publishedAt));
}

export async function createRFP(input: CreateRFPInput) {
  const user = await getCurrentUser();
  const [rfp] = await db
    .insert(rfps)
    .values({ userId: user.id, data: input.data })
    .returning();
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
