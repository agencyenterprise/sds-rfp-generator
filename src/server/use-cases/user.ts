import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { users } from "../db/schema";

export async function getCurrentUser() {
  const { userId } = auth().protect();
  const [user] = await db.select().from(users).where(eq(users.userId, userId));
  if (!user) throw new Error("User not found");
  return user;
}
