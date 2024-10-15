import { relations, sql } from "drizzle-orm";
import { jsonb, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const users = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => `user_${createId()}`),
  userId: varchar("user_id").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  email: varchar("email"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  rfps: many(rfps),
}));

export const rfps = pgTable("rfps", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => `rfp_${createId()}`),
  userId: varchar("user_id").references(() => users.id),
  title: varchar("title"),
  data: jsonb("data"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const rfpsRelations = relations(rfps, ({ one }) => ({
  owner: one(users, {
    fields: [rfps.userId],
    references: [users.id],
  }),
}));
