"use server";

import { db } from "@/lib/database";
import { getMe } from "../authutils";
import {
  DzienTygodnia,
  GodzinaNiedzielna,
  GodzinaTygodniowa,
  planNiedzielny,
  PlanNiedzielnyInsert,
  planTygodniowy,
  PlanTygodniowyInsert,
} from "@/lib/database/scheme";
import { eq } from "drizzle-orm";

function getHourObject(
  godzina: GodzinaTygodniowa,
  value: boolean
): Partial<PlanTygodniowyInsert> {
  switch (godzina) {
    case GodzinaTygodniowa.OSIEMNASTA:
      return { GodzinaTygodniowa: godzina };
    case GodzinaTygodniowa.OSMA:
      return { GodzinaTygodniowa: godzina };

    default:
      return {};
  }
}

export async function zapiszNaGodzine(
  godzina: GodzinaTygodniowa,
  dzien: DzienTygodnia
) {
  const user = await getMe();

  if (!user) {
    throw new Error("unauthorized");
  }

  const userPlanEntry = await db.query.planTygodniowy.findFirst({
    where: eq(planTygodniowy.userId, user.id),
  });

  if (userPlanEntry) {
    await db
      .update(planTygodniowy)
      .set(getHourObject(godzina, true))
      .where(eq(planTygodniowy.userId, user.id));
  } else {
    await db.insert(planTygodniowy).values({
      userId: user.id,
      GodzinaTygodniowa: godzina === godzina,
      DzienTygodnia: dzien === dzien,
    });
  }
}

export async function wypiszZGodziny(godzina: GodzinaTygodniowa) {
  const user = await getMe();

  if (!user) {
    throw new Error("unauthorized");
  }

  const userPlanEntry = await db.query.planNiedzielny.findFirst({
    where: eq(planNiedzielny.userId, user.id),
  });

  if (userPlanEntry) {
    await db
      .update(planNiedzielny)
      .set(getHourObject(godzina, false))
      .where(eq(planNiedzielny.userId, user.id));
  } else {
    await db.insert(planNiedzielny).values({
      userId: user.id,
    });
  }
}
