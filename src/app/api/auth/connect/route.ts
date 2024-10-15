import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export async function GET(request: Request) {
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
    return NextResponse.redirect(new URL("/generate", request.url));
  } catch (error) {
    console.error("Error upserting user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
