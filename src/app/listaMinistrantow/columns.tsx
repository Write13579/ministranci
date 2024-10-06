"use client";

import { UserRanga } from "@/lib/database/scheme";
import { ColumnDef } from "@tanstack/react-table";

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
  { accessorKey: "ranga", header: "Ranga" },
  { accessorKey: "wiek", header: "Wiek" },
  { accessorKey: "miesiacPrzystapienia", header: "Miesiąc przystąpienia" },
  { accessorKey: "czasSluzby", header: "Czas służby (w miesiącach)" },
];
