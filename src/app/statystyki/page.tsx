import { db } from "@/lib/database";
import Statystyki from "./statystyki";
import { getMe } from "../authutils";
import { odznakiToUsers } from "@/lib/database/scheme";
import { eq } from "drizzle-orm";

export default async function PageStatystyki() {
  const me = await getMe();

  const myBadges = await db.query.odznakiToUsers.findMany({
    where: eq(odznakiToUsers.userId, me!.id),
    with: { odznaka: true },
  });

  return <Statystyki myBadges={myBadges} />;
}
