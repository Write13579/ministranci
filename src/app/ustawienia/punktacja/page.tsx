import {
  Punktacja,
  PunktacjaTypNabozenstwa,
  punktacje,
} from "@/lib/database/scheme";
import { DataTable } from "./data-tablePKT";
import { db } from "@/lib/database";
import { PunktacjaTable } from "./puinktacja-table";
import { desc } from "drizzle-orm";

async function getData() {
  const users = await db.query.users.findMany({ with: { punktacje: true } });

  users.forEach(async (user) => {
    const punktacja = user.punktacje.find(
      (p) =>
        p.miesiac.getMonth() === new Date().getMonth() &&
        p.miesiac.getFullYear() === new Date().getFullYear()
    );

    if (!punktacja) {
      await db.insert(punktacje).values({
        miesiac: new Date(),
        userId: user.id,
        typNabozenstwa: PunktacjaTypNabozenstwa.DEFAULT,
      });
    }
  });

  const allPunktacje = await db.query.punktacje.findMany({
    with: { user: true },
    orderBy: desc(punktacje.userId),
  });
  return allPunktacje;
}

export type PunktacjaData = Awaited<ReturnType<typeof getData>>;

export default async function punktacjaPage() {
  const data = await getData();
  return (
    <div id="alles">
      <h1 className="flex justify-center items-center text-3xl mb-2 font-bold italic">
        PRZYZNAJ PUNKTY
      </h1>
      <div className="container mx-auto py-10">
        <PunktacjaTable data={data} />
      </div>
    </div>
  );
}
