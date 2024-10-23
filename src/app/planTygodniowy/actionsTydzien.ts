"use server";

import {
  DzienTygodnia,
  GodzinaTygodniowa,
  planTygodniowy,
} from "@/lib/database/scheme";
import { getMe } from "../authutils";
import { db } from "@/lib/database";
import { and, eq } from "drizzle-orm";

export async function wypiszZGodzinyWTygodniu(
  godzina: GodzinaTygodniowa,
  dzien: DzienTygodnia
) {
  const user = await getMe();

  if (!user) {
    throw new Error("unauthorized");
  }

  await db
    .delete(planTygodniowy)
    .where(
      and(
        eq(planTygodniowy.userId, user.id),
        eq(planTygodniowy.GodzinaTygodniowa, godzina),
        eq(planTygodniowy.DzienTygodnia, dzien)
      )
    );
}

export async function zapiszNaGodzineWTygodniu(
  godzina: GodzinaTygodniowa,
  dzien: DzienTygodnia
) {
  const user = await getMe();

  if (!user) {
    throw new Error("unauthorized");
  }

  const duplikat = await db.query.planTygodniowy.findFirst({
    where: and(
      eq(planTygodniowy.userId, user.id),
      eq(planTygodniowy.GodzinaTygodniowa, godzina),
      eq(planTygodniowy.DzienTygodnia, dzien)
    ),
  });

  if (duplikat) {
    return;
  }

  await db
    .insert(planTygodniowy)
    .values({
      userId: user.id,
      DzienTygodnia: dzien,
      GodzinaTygodniowa: godzina,
    });
}
