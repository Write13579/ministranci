import { Punktacja } from "@/lib/database/scheme";
import { ColumnDef } from "@tanstack/react-table";

export const columnsPKT: ColumnDef<Punktacja>[] = [
  {
    accessorKey: "userId",
    header: "ministrant",
  },
  {
    accessorKey: "niedziele",
    header: "niedz.",
  },
  {
    accessorKey: "wTygodniu",
    header: "tyg.",
  },
  {
    accessorKey: "nabozenstwa",
    header: "nab.",
  },
  {
    accessorKey: "zbiorki",
    header: "zbiórki",
  },
  {
    accessorKey: "dodatki",
    header: "dodatki",
  },
  {
    accessorKey: "komentarz",
    header: "komentarz",
  },
];
