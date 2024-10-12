"use server";

import { db } from "@/lib/database";
import { getMe } from "../authutils";
import { planNiedzielny } from "@/lib/database/scheme";
import { eq } from "drizzle-orm";

export async function zapiszNaGodzine(godzina: string) {
  const user = await getMe();

  const znajdzTypa = await db.query.planNiedzielny.findFirst({
    where: eq(planNiedzielny.userId, user!.id),
  });

  if (godzina === "8:00") {
    db.insert(planNiedzielny).values({ naOsma: true });
  }
}
