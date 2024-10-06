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

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Imię i nazwisko",
    cell: ({ row }) => {
      return <p className="font-semibold"> {row.getValue("name")} </p>;
    },
  },
  {
    accessorKey: "pseudonim",
    header: "Pseudonim",
  },
  {
    accessorKey: "ranga",
    header: "Ranga",
    cell: ({ row }) => {
      return <RangaBadge ranga={row.getValue("ranga") as UserRanga} />;
    },
  },
  { accessorKey: "wiek", header: "Wiek" },
  {
    accessorKey: "miesiacPrzystapienia",
    header: "Miesiąc przystąpienia",
    cell: ({ row }) => {
      return (
        <p>
          {(row.getValue("miesiacPrzystapienia") as Date) &&
            `${((row.getValue("miesiacPrzystapienia") as Date).getMonth() + 1)
              .toString()
              .padStart(2, "0")}.${(
              row.getValue("miesiacPrzystapienia") as Date
            ).getFullYear()}r.`}
        </p>
      );
    },
  },
  { accessorKey: "czasSluzby", header: "Czas służby (w miesiącach)" },
];
