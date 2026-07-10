import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const loveResponses = pgTable("love_responses", {
  id: serial("id").primaryKey(),
  answer: text("answer").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
