import { hashPassword } from "@/app/authutils";
import { db } from "@/lib/database";
import { UserRanga, users } from "@/lib/database/scheme";
import { generateRandomString } from "@/lib/utils";
import { count } from "drizzle-orm";

export async function GET() {
  const usersAmout = await db.select({ count: count() }).from(users);
  const amount = usersAmout[0].count;
  if (amount > 0) {
    return Response.json({ error: true });
  }
  const password = generateRandomString(10);
  await db.insert(users).values({
    login: "patrykbaraniak",
    name: "Patryk Baraniak",
    password: await hashPassword(password),
    ranga: UserRanga.ANIMATOR,
    admin: true,
  });
  return Response.json({ password });
}

export const dynamic = "force-dynamic";
