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
          cell: ({ row }) => (
            <Input
              className="w-16"
              type="number"
              value={row.original.data.wTygodniu}
              onChange={(e) => {
                if (!isNaN(parseInt(e.target.value))) {
                  updateData(
                    row.original.data.id,
                    "wTygodniu",
                    parseInt(e.target.value)
                  );
                } else {
                  updateData(row.original.data.id, "wTygodniu", 0);
                }
              }}
            />
          ),
        },
        {
          accessorKey: "data.nabozenstwa",
          header: "nab.",
          cell: ({ row }) => (
            <Input
              className="w-16"
              type="number"
              value={row.original.data.nabozenstwa}
              onChange={(e) => {
                if (!isNaN(parseInt(e.target.value))) {
                  updateData(
                    row.original.data.id,
                    "nabozenstwa",
                    parseInt(e.target.value)
                  );
                } else {
                  updateData(row.original.data.id, "nabozenstwa", 0);
                }
              }}
            />
          ),
        },
        {
          accessorKey: "data.zbiorki",
          header: "zbiórki",
          cell: ({ row }) => (
            <Input
              className="w-16"
              type="number"
              value={row.original.data.zbiorki}
              onChange={(e) => {
                if (!isNaN(parseInt(e.target.value))) {
                  updateData(
                    row.original.data.id,
                    "zbiorki",
                    parseInt(e.target.value)
                  );
                } else {
                  updateData(row.original.data.id, "zbiorki", 0);
                }
              }}
            />
          ),
        },
        {
          accessorKey: "data.dodatki",
          header: "dodatki",
          cell: ({ row }) => (
            <Input
              className="w-16"
              type="number"
              value={row.original.data.dodatki}
              onChange={(e) => {
                if (!isNaN(parseInt(e.target.value))) {
                  updateData(
                    row.original.data.id,
                    "dodatki",
                    parseInt(e.target.value)
                  );
                } else {
                  updateData(row.original.data.id, "dodatki", 0);
                }
              }}
            />
          ),
        },
        {
          accessorKey: "data.komentarz",
          header: "komentarz",
          cell: ({ row }) => (
            <Input
              className="w-16"
              type="text"
              value={row.original.data.komentarz || ""}
              onChange={(e) => {
                updateData(row.original.data.id, "komentarz", e.target.value);
              }}
            />
          ),
        },
        {
          accessorKey: "data.id",
          header: "suma",
          cell: ({ row }) => {
            const wynik = 0;
            return <span>{wynik}</span>;
          },
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
