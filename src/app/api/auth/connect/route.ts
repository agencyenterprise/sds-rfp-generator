import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { env } from "~/env";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const user = await currentUser();
  try {
    await db
      .insert(users)
      .values({
        userId,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.emailAddresses[0]!.emailAddress,
      })
      .onConflictDoUpdate({
        target: users.userId,
        set: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.emailAddresses[0]!.emailAddress,
        },
      });
    return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_URL));
  } catch (error) {
    console.error("Error upserting user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
