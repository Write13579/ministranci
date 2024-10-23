"use server";

import { getMe } from "@/app/authutils";
import { db } from "@/lib/database";
import { odznaki, odznakiToUsers } from "@/lib/database/scheme";

export async function stworzIDodajOdznake(
  napis: string,
  kolor: string,
  ministranci: number[]
) {
  const user = await getMe();

  if (!user || !user.admin) {
    throw new Error("unauthorized");
  }

  const result = await db
    .insert(odznaki)
    .values({ napis, kolor })
    .returning({ insertedId: odznaki.id });

  await db.insert(odznakiToUsers).values(
    ministranci.map((ministrant) => ({
      odznakaId: result[0].insertedId,
      userId: ministrant,
    }))
  );
}
