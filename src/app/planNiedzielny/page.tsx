"use server";

import { db } from "@/lib/database";
import TabelaNiedziela from "./tabelaNiedziela";

async function getUsersWithNiedziela() {
  const userWithNiedziela = await db.query.users.findMany({
    with: { planNiedzielny: true },
  });
  return userWithNiedziela;
}

export type UserWithNiedziela = Awaited<
  ReturnType<typeof getUsersWithNiedziela>
>;

export default async function planNiedzielny() {
  const users = await getUsersWithNiedziela();
  return <TabelaNiedziela users={users} />;
}
