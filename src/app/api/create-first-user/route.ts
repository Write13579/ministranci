import { hashPassword } from "@/app/authutils";
import { db } from "@/lib/database";
import { planNiedzielny, UserRanga, users } from "@/lib/database/scheme";
import { generateRandomString } from "@/lib/utils";
import { count } from "drizzle-orm";

export async function GET() {
  const usersAmout = await db.select({ count: count() }).from(users);
  const amount = usersAmout[0].count;

  if (amount > 0) {
    return Response.json({ error: true });
  }

  const password = generateRandomString(10);

  const insertData = await db
    .insert(users)
    .values({
      login: "patrykbaraniak",
      name: "Patryk Baraniak",
      password: await hashPassword(password),
      ranga: UserRanga.ANIMATOR,
      admin: true,
    })
    .returning({ insertedId: users.id });

  await db.insert(planNiedzielny).values({
    userId: insertData[0].insertedId,
    sobotaNaSiedemnasta: false,
    naOsma: false,
    naDziesiata: false,
    naDwunasta: false,
    naSiedemnasta: false,
  });

  return Response.json({ password });
}

export const dynamic = "force-dynamic";
