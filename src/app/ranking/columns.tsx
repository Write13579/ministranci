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
    accessorKey: "ranga",
    header: "Ranga",
    cell: ({ row }) => {
      return <RangaBadge ranga={row.getValue("ranga") as UserRanga} />;
    },
  },
  {
    accessorKey: "allPoints",
    header: "Wszystkie punkty",
    cell: ({ row }) => {
      return <p>{row.getValue("allPoints")}pkt</p>;
    },
  },
  { accessorKey: "odznaki", header: "Odznaki" },
];
