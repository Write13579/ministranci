import { boolean, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const createEnum = <T extends { [key: string]: string }>(
  e: T
): [T[keyof T], ...[T[keyof T]]] =>
  Object.values(e) as unknown as [T[keyof T], ...[T[keyof T]]];

export enum UserRanga {
  ANIMATOR = "ANIMATOR",
  ALBA = "ALBA",
  CZARNY = "CZARNY",
  KOLNIERZ = "KOLNIERZ",
  BEZKOLNIERZ = "BEZKOLNIERZ",
  KANDYDAT = "KANDYDAT",
}

export const userRangaEnum = pgEnum("UserRanga", createEnum(UserRanga));

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  login: varchar("login", { length: 256 }).unique().notNull(),
  name: varchar("name", { length: 256 }).unique().notNull(),
  ranga: userRangaEnum("ranga").notNull(),
  admin: boolean("admin").default(false).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  pseudonim: varchar("pseudonim", { length: 30 })
    .default("ministrant")
    .notNull(),
  bio: varchar("bio", { length: 256 }),
});

export type User = typeof users.$inferSelect;
