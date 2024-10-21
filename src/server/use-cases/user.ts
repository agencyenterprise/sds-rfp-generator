import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { users } from "../db/schema";

export async function getCurrentUser() {
  const { userId } = auth().protect();
  const [user] = await db.select().from(users).where(eq(users.userId, userId));
  if (!user) {
    const clerkUser = await currentUser();
    const [createdUser] = await db
      .insert(users)
      .values({
        userId,
        firstName: clerkUser?.firstName,
        lastName: clerkUser?.lastName,
        email: clerkUser?.emailAddresses[0]?.emailAddress,
      })
      .returning();
    if (!createdUser) {
      throw new Error("Failed to create user with userId: " + userId);
    }
    return createdUser;
  }
  return user;
}
