import { User } from "@/lib/database/scheme";
import { db } from "@/lib/database";
import Link from "next/link";
import { House } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { pobierzPunkty } from "./ranking-actions";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.

  const allUsers = await db.query.users.findMany();
  return allUsers;
}

export default async function pageRanking() {
  const sumyPunktow = await pobierzPunkty();
  //console.log(sumyPunktow);

  const data = await getData();
  return (
    <div id="wraper" className="relative">
      <Link href="/" className="mx-5 flex absolute top-1">
        <House />
      </Link>
      <div id="alles">
        <h1 className="flex justify-center items-center text-3xl mb-1 font-bold italic round">
          RANKING
        </h1>
        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={data.map((p) => ({ ...p, sumyPunktow: sumyPunktow }))}
          />
        </div>
      </div>
    </div>
  );
}
