"use server";

import { db } from "@/lib/database";
import { punktacje } from "@/lib/database/scheme";
import { eq } from "drizzle-orm";

export async function pobierzPunkty(id: number){
    const punktyUseraZAllMsc = await db.query.punktacje.findMany({with: {user: true}, where: eq(punktacje.userId, id) });
    const tablicaWynikowMiesiaca = punktyUseraZAllMsc.map(user => (user.niedziele <= 4
        ? user.niedziele * 5
        : 4 * 5 + (user.niedziele - 4) * 3) +
      (user.wTygodniu <= 4
        ? user.wTygodniu * 5
        : 4 * 5 + (user.wTygodniu - 4) * 3) +
      user.nabozenstwa * 3 +
      user.zbiorki * 4 +
      user.dodatki);
      return tablicaWynikowMiesiaca.reduce((sum, currentElement) => sum + currentElement, 0);}