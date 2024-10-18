import mockRFPs from "~/data/mockRFPs";

import { db } from "./index";
import { rfps } from "./schema";

export async function seed() {
  // Clear existing data
  // eslint-disable-next-line drizzle/enforce-delete-with-where
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
