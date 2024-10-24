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
  //console.log(tablicaWynikowMiesiaca);

  return tablicaWynikowMiesiaca;
}

export async function pobierzPunktyZMiesiacemIRokiem() {
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
    miesiac: punktyDlaUsera.miesiac.getMonth() + 1,
    rok: punktyDlaUsera.miesiac.getFullYear(),
    data: punktyDlaUsera.miesiac,
  }));

  return tablicaWynikowMiesiaca;
}

export async function pobierzMojePunkty(mojeId: number) {
  const wszystkieSumyPunktowUserow = await pobierzPunkty();

  const mojePunkty = wszystkieSumyPunktowUserow.filter(
    (ministrant) => ministrant.userId === mojeId
  );
  const tablicaMoichPunktow = mojePunkty.map(
    (obiektMiesiaca) => obiektMiesiaca.punkty
  );
  return tablicaMoichPunktow.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
}
