import { relations } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  date,
} from "drizzle-orm/pg-core";

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

export enum PunktacjaTypNabozenstwa {
  DEFAULT = "DEFAULT",
  ROZANIEC = "ROZANIEC",
  RORATY = "RORATY",
  NIESZPORY = "NIESZPORY",
  DROGA_KRZYZOWA = "DROGA_KRZYZOWA",
}

export const punktacjaTypNabozenstwaEnum = pgEnum(
  "PunktacjaTypNabozenstwa",
  createEnum(PunktacjaTypNabozenstwa)
);

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
  wiek: integer("wiek"),
  miesiacPrzystapienia: date("miesiacPrzystapienia", {
    mode: "date",
  }),
  czasSluzby: integer("czasSluzby"),
});

export type User = typeof users.$inferSelect;

export const infos = pgTable("infos", {
  id: serial("id").primaryKey(),
  tytul: varchar("tytul", { length: 256 }).notNull(),
  tresc: varchar("tresc", { length: 700 }).notNull(),
  pinned: boolean("pinned").default(false).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const punktacje = pgTable("punktacje", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  niedziele: integer("niedziele").default(0).notNull(),
  wTygodniu: integer("wTygodniu").default(0).notNull(),
  nabozenstwa: integer("nabozenstwa").default(0).notNull(),
  zbiorki: integer("zbiorki").default(0).notNull(),
  dodatki: integer("dodatki").default(0).notNull(),
  komentarz: varchar("komentarz", { length: 256 }),
  miesiac: date("miesiac", {
    mode: "date",
  }).notNull(),
  typNabozenstwa: punktacjaTypNabozenstwaEnum("typNabozenstwa").notNull(),
});

export type Punktacja = typeof punktacje.$inferSelect;

export const usersRelations = relations(users, ({ many, one }) => ({
  punktacje: many(punktacje),
  planNiedzielny: one(planNiedzielny),
}));

export const punktacjeRelations = relations(punktacje, ({ one }) => ({
  user: one(users, { fields: [punktacje.userId], references: [users.id] }),
}));

export const planNiedzielny = pgTable("planNiedzielny", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  sobotaNaSiedemnasta: boolean("sobotaNaSiedemnasta"),
  naOsma: boolean("naOsma"),
  naDziesiata: boolean("naDziesiata"),
  naDwunasta: boolean("naDwunasta"),
  naSiedemnasta: boolean("naSiedemnasta"),
});

export type PlanNiedzielny = typeof planNiedzielny.$inferSelect;

export const planNiedzielnyRelations = relations(planNiedzielny, ({ one }) => ({
  user: one(users, { fields: [planNiedzielny.userId], references: [users.id] }),
}));
