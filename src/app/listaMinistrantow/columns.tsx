"use client";

import { Badge } from "@/components/ui/badge";
import { UserRanga } from "@/lib/database/scheme";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

export type Ministrant = {
  id: number;
  name: string;
  pseudonim: string;
  ranga: UserRanga;
  bio: string | null;
  wiek: number | null;
  miesiacPrzystapienia: number | null;
  czasSluzby: number | null;
};

export const columns: ColumnDef<Ministrant>[] = [
  { accessorKey: "name", header: "Imię i nazwisko" },
  {
    accessorKey: "pseudonim",
    header: "Pseudonim",
  },
  {
    accessorKey: "ranga",
    header: "Ranga",
    cell: ({ row }) => {
      const value = row.getValue("ranga") as UserRanga;

      return (
        <Badge
          className={clsx({
            "bg-blue-500 hover:bg-blue-400": value === UserRanga.ALBA,
            "bg-green-500 hover:bg-green-400": value === UserRanga.ANIMATOR,
            "bg-yellow-500 hover:bg-yellow-400":
              value === UserRanga.BEZKOLNIERZ,
            "bg-black hover:bg-gray-700": value === UserRanga.CZARNY,
            "bg-purple-500 hover:bg-purple-400": value === UserRanga.KANDYDAT,
            "bg-indigo-500 hover:bg-indigo-400": value === UserRanga.KOLNIERZ,
          })}
        >
          {value}
        </Badge>
      );
    },
  },
  { accessorKey: "wiek", header: "Wiek" },
  { accessorKey: "miesiacPrzystapienia", header: "Miesiąc przystąpienia" },
  { accessorKey: "czasSluzby", header: "Czas służby (w miesiącach)" },
];
