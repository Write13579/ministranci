"use server";

import { db } from "@/lib/database";
import TabelaNiedziela from "./tabelaNiedziela";
import { getMe } from "../authutils";
import { eq } from "drizzle-orm";
import { planNiedzielny } from "@/lib/database/scheme";
async function getUsersWithNiedziela() {
  const userWithNiedziela = await db.query.users.findMany({
    with: { planNiedzielny: true },
  });
  return userWithNiedziela;
}

export type UserWithNiedziela = Awaited<
  ReturnType<typeof getUsersWithNiedziela>
>;

export default async function planNiedzielnyPage() {
  const users = await getUsersWithNiedziela();
  const user = await getMe();
  const userPlan = await db.query.planNiedzielny.findFirst({
    where: eq(planNiedzielny.userId, user!.id),
  });
  if (!userPlan) return null;
  return <TabelaNiedziela users={users} userPlan={userPlan} />;
}
