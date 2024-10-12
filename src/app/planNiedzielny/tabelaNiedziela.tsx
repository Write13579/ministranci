"use client";

import { PlanNiedzielny, GodzinaNiedzielna } from "@/lib/database/scheme";
import { useState } from "react";
import { UserWithNiedziela } from "./page";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import clsx from "clsx";
import { zapiszNaGodzine, wypiszZGodziny } from "./actionsNiedziela";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function naGodzine(planUsera: PlanNiedzielny, godzina: GodzinaNiedzielna) {
  switch (godzina) {
    case GodzinaNiedzielna.SOBOTA17:
      return planUsera.sobotaNaSiedemnasta;
    case GodzinaNiedzielna.OSMA:
      return planUsera.naOsma;
    case GodzinaNiedzielna.DZIESIATA:
      return planUsera.naDziesiata;
    case GodzinaNiedzielna.DWUNASTA:
      return planUsera.naDwunasta;
    case GodzinaNiedzielna.SIEDMNASTA:
      return planUsera.naSiedemnasta;

    default:
      return false;
  }
}

function ZapiszSieButton({
  godzina,
  onSave,
}: {
  godzina: GodzinaNiedzielna;
  onSave?: () => void;
}) {
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await zapiszNaGodzine(godzina);
    setSaving(false);
    onSave?.();
  }

  return (
    <Button onClick={save} loading={saving}>
      Zapisz się
    </Button>
  );
}

function WypiszSieButton({
  godzina,
  onUnsave,
}: {
  godzina: GodzinaNiedzielna;
  onUnsave?: () => void;
}) {
  const [unsaving, setUnsaving] = useState(false);

  async function unsave() {
    setUnsaving(true);
    await wypiszZGodziny(godzina);
    setUnsaving(false);
    onUnsave?.();
  }

  return (
    <Button onClick={unsave} loading={unsaving}>
      Wypisz się
    </Button>
  );
}

export default function TabelaNiedziela({
  users,
}: {
  users: UserWithNiedziela;
}) {
  const me = useAuth();
  const router = useRouter();

  const [editing, setEditing] = useState(false);

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
        {Object.values(GodzinaNiedzielna).map((godzina) => (
          <div className="grid grid-cols-3 border border-black" key={godzina}>
            <div className="my-2">{godzina}</div>
            {!editing ? (
              <div className="col-span-2 border-2 border-x-black flex items-center gap-2">
                {users
                  .filter((user) => {
                    if (!user.planNiedzielny) return false;
                    return naGodzine(user.planNiedzielny, godzina);
                  })
                  .sort((u) => (u.id === me!.id ? -1 : 1))
                  .map((userForGodzina) => (
                    <span
                      key={userForGodzina.id}
                      className={clsx(
                        me!.id === userForGodzina.id && "font-bold"
                      )}
                    >
                      {userForGodzina.name}
                    </span>
                  ))}
              </div>
            ) : (
              <div className="my-2 col-span-2">
                <ZapiszSieButton
                  onSave={() => {
                    router.refresh();
                    setEditing(false);
                    toast(`Zapisano na godzinę: ${godzina}!`);
                  }}
                  godzina={godzina}
                />

                <WypiszSieButton
                  onUnsave={() => {
                    router.refresh();
                    setEditing(false);
                    toast(`Wypisano się z godziny: ${godzina}!`);
                  }}
                  godzina={godzina}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
