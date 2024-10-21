"use server";

import { db } from "@/lib/database";

export async function pobierzPunkty() {
  const punktyUserowZAllMsc = await db.query.punktacje.findMany({
    with: { user: true },
  });
  const tablicaWynikowMiesiaca = punktyUserowZAllMsc.map((punktyDlaUsera) => ({
    punkty:
      (punktyDlaUsera.niedziele <= 4
        ? punktyDlaUsera.niedziele * 5
        : 4 * 5 + (punktyDlaUsera.niedziele - 4) * 3) +
      (punktyDlaUsera.wTygodniu <= 4
        ? punktyDlaUsera.wTygodniu * 5
        : 4 * 5 + (punktyDlaUsera.wTygodniu - 4) * 3) +
      punktyDlaUsera.nabozenstwa * 3 +
      punktyDlaUsera.zbiorki * 4 +
      punktyDlaUsera.dodatki,
    userId: punktyDlaUsera.userId,
  }));
  console.log(tablicaWynikowMiesiaca);

  return tablicaWynikowMiesiaca;
}
