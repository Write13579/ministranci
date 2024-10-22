"use server";

import { getMe } from "@/app/authutils";
import { User } from "@/lib/database/scheme";

export async function stworzIDodajOdznake(
  napis: string,
  kolor: string,
  ministrant: User
) {
  const user = await getMe();

  if (!user || !user.admin) {
    throw new Error("unauthorized");
  }
}
