"use server";

import { db } from "@/lib/database";
import TabelaTydzien from "./tabelaTydzien";
import { getMe } from "../authutils";
import { eq } from "drizzle-orm";
import { planNiedzielny, planTygodniowy } from "@/lib/database/scheme";

async function getUsersWithTydzien() {
  const userWithTydzien = await db.query.users.findMany({
    with: { planTygodniowy: true },
  });
  return userWithTydzien;
}

export type UserWithTydzien = Awaited<ReturnType<typeof getUsersWithTydzien>>;

export default async function planNiedzielnyPage() {
  const users = await getUsersWithTydzien();
  const user = await getMe();
  const userPlan = await db.query.planTygodniowy.findFirst({
    where: eq(planTygodniowy.userId, user!.id),
  });
  if (!userPlan) return null;
  return <TabelaTydzien users={users} userPlan={userPlan} />;
}
