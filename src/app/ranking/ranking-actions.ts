"use server";

import { db } from "@/lib/database";

export async function pobierzPunkty() {
  const punktyUserowZAllMsc = await db.query.punktacje.findMany({
    with: { user: true },
  });
  const tablicaWynikowMiesiaca = punktyUserowZAllMsc.map((user) => ({
    punkty:
      (user.niedziele <= 4
        ? user.niedziele * 5
        : 4 * 5 + (user.niedziele - 4) * 3) +
      (user.wTygodniu <= 4
        ? user.wTygodniu * 5
        : 4 * 5 + (user.wTygodniu - 4) * 3) +
      user.nabozenstwa * 3 +
      user.zbiorki * 4 +
      user.dodatki,
    userId: user.id,
  }));
  return tablicaWynikowMiesiaca;
}
