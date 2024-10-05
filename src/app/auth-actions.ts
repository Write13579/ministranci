"use server";

import { db } from "@/lib/database";
import { UserRanga, users } from "@/lib/database/scheme";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { encode, getMe, hashPassword, verifyPassword } from "./authutils";
import { generateRandomString } from "@/lib/utils";

export async function sprawdzLogowanie(login: string, password: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.login, login),
  });
  if (!user) {
    return [{ field: "login", error: "podany login nie istnieje" }];
  }
  const correctPassword = await verifyPassword(password, user.password);

  if (!correctPassword) {
    return [{ field: "haslo", error: "podane hasło jest nieprawidłowe" }];
  }
  const token = await encode(user);
  cookies().set("JWTToken", token);
  return [];
}

export async function zmienHaslo(stareHaslo: string, noweHaslo: string) {
  const user = await getMe();
  if (!user) {
    return [];
  }
  const correctOldPassword = await verifyPassword(stareHaslo, user.password);
  const correctNewPassword = noweHaslo.length >= 4 || noweHaslo.length <= 25;

  if (!correctOldPassword) {
    return [{ field: "stareHaslo", error: "podane hasło jest nieprawidłowe" }];
  }
  if (!correctNewPassword) {
    return [{ field: "noweHaslo", error: "zla ilosc znakow" }];
  }

  const noweHasloHashed = await hashPassword(noweHaslo);
  await db
    .update(users)
    .set({ password: noweHasloHashed })
    .where(eq(users.id, user.id));
  return [];
}

export async function Wyloguj() {
  cookies().delete("JWTToken");
}

export async function zmienNick(nick: string) {
  const user = await getMe();
  if (!user) {
    throw new Error("unauthorized");
  }
  await db.update(users).set({ pseudonim: nick }).where(eq(users.id, user.id));
}

export async function stworzMinistranta(
  login: string,
  name: string,
  ranga: UserRanga,
  admin: boolean
) {
  const user = await getMe();

  if (!user || !user.admin) {
    throw new Error("unauthorized");
  }

  if (
    name.length < 4 ||
    name.length > 50 ||
    login.length < 4 ||
    login.length > 50 ||
    !Object.keys(UserRanga).includes(ranga)
  ) {
    return { data: null, errors: [] };
  }

  const password = generateRandomString(8);

  await db.insert(users).values({
    login,
    name,
    password: await hashPassword(password),
    ranga,
    admin,
  });

  return { data: { login, password }, errors: [] };
}
