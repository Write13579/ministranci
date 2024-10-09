"use client";

import { Input } from "@/components/ui/input";
import { DataTable } from "./data-tablePKT";
import { usePunktacja } from "./use-punktacja";
import { PunktacjaData } from "./page";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export const PunktacjaTable = ({ data }: { data: PunktacjaData }) => {
  const { data: punktacjaData, updateData, saveData } = usePunktacja(data);

  const columns = useMemo(
    () =>
      [
        {
          accessorKey: "data.user.name",
          header: "ministrant",
        },
        {
          accessorKey: "data.niedziele",
          header: "niedz.",
          cell: ({ row }) => (
            <Input
              className="w-16"
              type="number"
              value={row.original.data.niedziele}
              onChange={(e) => {
                if (!isNaN(parseInt(e.target.value))) {
                  updateData(
                    row.original.data.id,
                    "niedziele",
                    parseInt(e.target.value)
                  );
                } else {
                  updateData(row.original.data.id, "niedziele", 0);
                }
              }}
            />
          ),
        },
        {
          accessorKey: "data.wTygodniu",
          header: "tyg.",
        },
        {
          accessorKey: "data.nabozenstwa",
          header: "nab.",
        },
        {
          accessorKey: "data.zbiorki",
          header: "zbiórki",
        },
        {
          accessorKey: "data.dodatki",
          header: "dodatki",
        },
        {
          accessorKey: "data.komentarz",
          header: "komentarz",
        },
        {
          accessorKey: "data.id",
          header: "suma",
        },
      ] as ColumnDef<{ data: PunktacjaData[number]; edited: boolean }>[],
    [data]
  );

  return (
    <div className="flex flex-col gap-8">
      <Button onClick={saveData}>Zapisz</Button>
      <DataTable columns={columns} data={punktacjaData} />
    </div>
  );
};
