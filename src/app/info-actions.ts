"use server";

import { db } from "@/lib/database";
import { infos } from "@/lib/database/scheme";
import { eq, not } from "drizzle-orm";
import { getMe } from "./authutils";

export async function napiszInformacje(tytul: string, tresc: string) {
  const user = await getMe();

  if (!user || !user.admin) {
    throw new Error("unauthorized");
  }

  if (
    tytul.length < 4 ||
    tytul.length > 256 ||
    tresc.length < 4 ||
    tresc.length > 700
  ) {
    return { data: null, errors: [] };
  }

  await db.insert(infos).values({
    tytul,
    tresc,
  });

  return { errors: [] };
}

export async function usunInformacje(id: number) {
  await db.delete(infos).where(eq(infos.id, id));
}

export async function togglePinInformacja(id: number) {
  await db
    .update(infos)
    .set({ pinned: false })
    .where(not(eq(infos.id, id)));
  await db
    .update(infos)
    .set({ pinned: not(infos.pinned) })
    .where(eq(infos.id, id));
}
