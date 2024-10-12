"use client";

import { PlanNiedzielny } from "@/lib/database/scheme";
import { useState } from "react";
import { UserWithNiedziela } from "./page";
import { Button } from "@/components/ui/button";

export default function TabelaNiedziela({
  users,
}: {
  users: UserWithNiedziela;
}) {
  const godzinyNiedzielne = ["sobota 17:00", "8:00", "10:00", "12:00", "17:00"];

  function naGodzine(planUsera: PlanNiedzielny, godzina: string) {
    switch (godzina) {
      case "sobota 17:00":
        return planUsera.sobotaNaSiedemnasta;
      case "8:00":
        return planUsera.naOsma;
      case "10:00":
        return planUsera.naDziesiata;
      case "12:00":
        return planUsera.naDwunasta;
      case "17:00":
        return planUsera.naSiedemnasta;

      default:
        return false;
    }
  }

  const [editing, setEditing] = useState(false);

  //nwm moze table zrobic zamiast divow
  return (
    <div>
      <h1 className="flex justify-center items-center text-3xl mb-10 font-bold italic">
        PLAN NIEDZIELNY
      </h1>
      <div className="mb-6 flex justify-center">
        {!editing && (
          <Button onClick={() => setEditing(true)}>Zmień swoją godzinę</Button>
        )}
      </div>
      <div className="mx-4 border-3 border-black">
        {godzinyNiedzielne.map((godzina) => (
          <div className="grid grid-cols-3 border border-black">
            <div className="my-2">{godzina}</div>
            {!editing ? (
              <div className="col-span-2 border-2 border-x-black">
                {users
                  .filter(
                    (user) =>
                      user.planNiedzielny &&
                      naGodzine(user.planNiedzielny, godzina)
                  )
                  .map((userForGodzina) => userForGodzina.name)}
              </div>
            ) : (
              <div className="my-2 col-span-2">
                <Button
                  className="flex justify-center text-center items-center"
                  onClick={() => setEditing(false)}
                >
                  Zapisz się
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
