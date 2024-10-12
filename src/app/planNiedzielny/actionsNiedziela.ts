"use server";

import { db } from "@/lib/database";
import { getMe } from "../authutils";
import {
  GodzinaNiedzielna,
  planNiedzielny,
  PlanNiedzielnyInsert,
} from "@/lib/database/scheme";
import { eq } from "drizzle-orm";

function getHourObject(
  godzina: GodzinaNiedzielna,
  value: boolean
): Partial<PlanNiedzielnyInsert> {
  switch (godzina) {
    case GodzinaNiedzielna.SOBOTA17:
      return { sobotaNaSiedemnasta: value };
    case GodzinaNiedzielna.OSMA:
      return { naOsma: value };
    case GodzinaNiedzielna.DZIESIATA:
      return { naDziesiata: value };
    case GodzinaNiedzielna.DWUNASTA:
      return { naDwunasta: value };
    case GodzinaNiedzielna.SIEDMNASTA:
      return { naSiedemnasta: value };
    default:
      return {};
  }
}

export async function zapiszNaGodzine(godzina: GodzinaNiedzielna) {
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
      .set(getHourObject(godzina, true))
      .where(eq(planNiedzielny.userId, user.id));
  } else {
    await db.insert(planNiedzielny).values({
      userId: user.id,
      sobotaNaSiedemnasta: godzina === GodzinaNiedzielna.SOBOTA17,
      naOsma: godzina === GodzinaNiedzielna.OSMA,
      naDziesiata: godzina === GodzinaNiedzielna.DZIESIATA,
      naDwunasta: godzina === GodzinaNiedzielna.DWUNASTA,
      naSiedemnasta: godzina === GodzinaNiedzielna.SIEDMNASTA,
    });
  }
}

export async function wypiszZGodziny(godzina: GodzinaNiedzielna) {
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
