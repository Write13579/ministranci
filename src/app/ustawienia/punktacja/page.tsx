import { Punktacja } from "@/lib/database/scheme";
import { columnsPKT } from "./columnsPKT";
import { DataTable } from "./data-tablePKT";
import { db } from "@/lib/database";

async function getData(): Promise<Punktacja[]> {
  // Fetch data from your API here.

  const allPunktacje = await db.query.punktacje.findMany();
  return allPunktacje;
}

export default async function punktacjaPage() {
  const data = await getData();
  return (
    <div id="alles">
      <h1 className="flex justify-center items-center text-3xl mb-2 font-bold italic">
        PRZYZNAJ PUNKTY
      </h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columnsPKT} data={data} />
      </div>
    </div>
  );
}
