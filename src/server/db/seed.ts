import { db } from "./index";
import { rfps, users } from "./schema";
import mockRFPs from "~/data/mockRFPs";

export async function seed() {
  const [user] = await db
    .insert(users)
    .values({
      email: "test@test.com",
      firstName: "Test",
      lastName: "User",
    })
    .returning();

  // Clear existing data
  await db.delete(rfps);

  // Insert mock data
  await db.insert(rfps).values(mockRFPs);
}

void seed()
  .then(() => {
    console.log("Database seeded successfully!");
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
  })
  .finally(() => {
    process.exit(0);
  });
