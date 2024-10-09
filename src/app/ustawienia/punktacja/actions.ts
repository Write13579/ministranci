"use server";

import { db } from "@/lib/database";
import { PunktacjaData } from "./page";
import { punktacje } from "@/lib/database/scheme";
import { eq } from "drizzle-orm";

export const savePunktacja = async (
  punktacja: { data: PunktacjaData[number]; edited: boolean }[]
) => {
  punktacja.forEach(async (punktacja) => {
    if (!punktacja.edited) return;

    await db
      .update(punktacje)
      .set({ ...punktacja.data })
      .where(eq(punktacje.id, punktacja.data.id));
  });
};
