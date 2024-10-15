import { db } from "./index";
import { rfps, users } from "./schema";

export async function seed() {
  const [user] = await db
    .insert(users)
    .values({
      email: "test@test.com",
      firstName: "Test",
      lastName: "User",
    })
    .returning();
  await db.insert(rfps).values({
    userId: user!.id,
    title: "Test RFP",
    data: {},
  });
}

void seed()
  .then(() => {
    console.log("Seeded!");
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    process.exit(0);
  });
