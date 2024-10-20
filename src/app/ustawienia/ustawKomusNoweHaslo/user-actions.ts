"use server";

import { db } from "@/lib/database";

export async function allUsersNames() {
  const users = await db.query.users.findMany();

  return users;
}
