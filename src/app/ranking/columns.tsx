"use client";

import RangaBadge from "@/components/RangaBadge";
import { User, UserRanga } from "@/lib/database/scheme";
import { ColumnDef } from "@tanstack/react-table";

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

export const columns: ColumnDef<User>[] = [
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
      console.log(
        wynik.filter((p) => p.userId === row.getValue("sumaPunktow"))
      );

      //return (
      //  <p>{wynik.filter((p) => p.userId === getValue("sumaPunktow"))}pkt</p>
      // );
    },
  },
  { accessorKey: "odznaki", header: "Odznaki" },
];