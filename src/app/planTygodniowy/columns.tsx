"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PlanTygodniowyWithUsers } from "./page";
import { DzienTygodnia, GodzinaTygodniowa, User } from "@/lib/database/scheme";
import clsx from "clsx";

export const columns = (
  me: number
): ColumnDef<PlanTygodniowyWithUsers[number]>[] => [
  {
    accessorKey: "godzina",
    header: "",
  },
  ...Object.values(DzienTygodnia).map(
    (dzien) =>
      ({
        accessorKey: dzien,
        cell: ({ row }) => {
          const users = row.getValue(dzien) as User[];
          if (
            dzien === DzienTygodnia.SOBOTA &&
            row.original.godzina === GodzinaTygodniowa.OSIEMNASTA
          ) {
            return <div className="italic font-semibold">PLAN NIEDZIELNY</div>;
          }
          return (
            <div className="space-y-3.5">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={clsx(me === user.id && "font-bold")}
                >
                  {user.name}
                </div>
              ))}
            </div>
          );
        },
      } as ColumnDef<PlanTygodniowyWithUsers[number]>)
  ),
];
