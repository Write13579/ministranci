"use server";

import { db } from "@/lib/database";
import TabelaNiedziela from "./tabelaNiedziela";

export async function functionUserWithNiedziela() {
  const userWithNiedziela = await db.query.users.findMany({
    with: { planNiedzielny: true },
  });
  return userWithNiedziela;
}

export type UserWithNiedziela = Awaited<
  ReturnType<typeof functionUserWithNiedziela>
>;

export default async function planNiedzielny() {
  const users = await db.query.users.findMany({
    with: { planNiedzielny: true },
  });
  return <TabelaNiedziela users={users} />;
}
