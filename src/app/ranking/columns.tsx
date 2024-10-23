"use client";

import RangaBadge from "@/components/RangaBadge";
import { User, UserRanga } from "@/lib/database/scheme";
import { ColumnDef } from "@tanstack/react-table";
import { UsersWithOdznaki } from "./page";
import { Badge } from "@/components/ui/badge";

// export type Ministrant = {
//   id: number;
//   name: string;
//   pseudonim: string;
//   ranga: UserRanga;
//   bio: string | null;
//   wiek: number | null;
//   miesiacPrzystapienia: Date | null;
//   czasSluzby: number | null;
// };

type punktyUserow = {
  punkty: number;
  userId: number;
};

export const columns: ColumnDef<UsersWithOdznaki[number]>[] = [
  {
    accessorKey: "name",
    header: "Imię i nazwisko",
    cell: ({ row }) => {
      return <p className="font-semibold"> {row.getValue("name")} </p>;
    },
  },
  {
    accessorKey: "ranga",
    header: "Ranga",
    cell: ({ row }) => {
      return <RangaBadge ranga={row.getValue("ranga") as UserRanga} />;
    },
  },
  {
    accessorKey: "sumyPunktow",
    header: "Wszystkie punkty",
    cell: ({ row }) => {
      const wynik = row.getValue("sumyPunktow") as punktyUserow[];

      const tablica = wynik.filter((p) => p.userId === row.original.id);

      return (
        <p className="italic">
          {tablica.reduce((acc, current) => acc + current.punkty, 0)} pkt
        </p>
      );
    },
  },
  {
    accessorKey: "odznaki",
    header: "Odznaki",
    cell: ({ row }) => {
      return (
        <div id="badges" className="space-y-1">
          {row.original.odznakiToUsers.map((pivot) => (
            <Badge
              style={{ backgroundColor: pivot.odznaka.kolor }}
              className="min-w-fit text-center text-nowrap"
            >
              {pivot.odznaka.napis}
            </Badge>
          ))}
        </div>
      );
    },
  },
];
