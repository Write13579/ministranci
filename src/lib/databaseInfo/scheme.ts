import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const infos = pgTable("infos", {
  id: serial("id").primaryKey(),
  tytul: varchar("tytul", { length: 256 }).notNull(),
  tresc: varchar("tresc", { length: 700 }).notNull(),
});

export type Info = typeof infos.$inferSelect;
