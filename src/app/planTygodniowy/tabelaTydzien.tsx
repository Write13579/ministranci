"use client";

import { GodzinaTygodniowa, DzienTygodnia } from "@/lib/database/scheme";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

import { House } from "lucide-react";
import Link from "next/link";
import {
  PlanTygodniowyWithUsers,
  PlanTygodniowyWithUsersNotSorted,
} from "./page";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { toast } from "sonner";
import {
  wypiszZGodzinyWTygodniu,
  zapiszNaGodzineWTygodniu,
} from "./actionsTydzien";

function ZapiszSieButton({
  godzina,
  dzien,
  onSave,
}: {
  godzina: GodzinaTygodniowa;
  dzien: DzienTygodnia;
  onSave?: () => void;
}) {
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await zapiszNaGodzineWTygodniu(godzina, dzien);
    setSaving(false);
    onSave?.();
  }

  return (
    <Button
      onClick={save}
      loading={saving}
      className="w-full mt-2.5 bg-green-600 hover:bg-green-500"
    >
      Zapisz się
    </Button>
  );
}

function WypiszSieButton({
  godzina,
  dzien,
  onUnsave,
}: {
  godzina: GodzinaTygodniowa;
  dzien: DzienTygodnia;
  onUnsave?: () => void;
}) {
  const [unsaving, setUnsaving] = useState(false);

  async function unsave() {
    setUnsaving(true);
    await wypiszZGodzinyWTygodniu(godzina, dzien);
    setUnsaving(false);
    onUnsave?.();
  }

  return (
    <Button
      onClick={unsave}
      loading={unsaving}
      className="w-full mt-2.5 bg-red-600 hover:bg-red-500"
    >
      Wypisz się
    </Button>
  );
}

export default function TabelaNiedziela({
  plany,
  planyNotSorted,
}: {
  plany: PlanTygodniowyWithUsers;
  planyNotSorted: PlanTygodniowyWithUsersNotSorted;
}) {
  const me = useAuth();
  const router = useRouter();

  const [editing, setEditing] = useState(true);

  return (
    <div id="wraper" className="relative">
      <Link href="/" className="mx-5 flex absolute top-1">
        <House />
      </Link>
      <div>
        <h1 className="flex justify-center items-center text-3xl mb-10 font-bold italic">
          PLAN TYGODNIOWY
        </h1>
        <div id="buttonZmianyGodziny" className="mb-9 flex justify-center">
          {!editing ? (
            <Button onClick={() => setEditing(true)}>
              Zmień swoją godzinę
            </Button>
          ) : (
            <Button onClick={() => setEditing(false)}>Anuluj</Button>
          )}
        </div>
        {!editing ? (
          <div
            id="calaTabela"
            className="mx-4 border-4 border-black rounded-md"
          >
            <DataTable data={plany} columns={columns(me!.id)} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-1 mx-2.5 gap-y-8">
            {Object.values(DzienTygodnia).map((dzien) =>
              Object.values(GodzinaTygodniowa)
                .filter(
                  (godzina) =>
                    dzien !== DzienTygodnia.SOBOTA ||
                    (dzien === DzienTygodnia.SOBOTA &&
                      godzina !== GodzinaTygodniowa.OSIEMNASTA)
                )
                .map((godzina) => (
                  <div>
                    <div className="font-bold text-center">
                      {[dzien, godzina].join(" ")}
                    </div>
                    <div>
                      {planyNotSorted
                        .filter((plan) => plan.userId === me!.id)
                        .find(
                          (plan) =>
                            plan.DzienTygodnia === dzien &&
                            plan.GodzinaTygodniowa === godzina
                        ) ? (
                        <WypiszSieButton
                          onUnsave={() => {
                            router.refresh();
                            setEditing(false);
                            toast(`Wypisałeś się z godziny: ${godzina}!`);
                          }}
                          godzina={godzina}
                          dzien={dzien}
                        />
                      ) : (
                        <ZapiszSieButton
                          onSave={() => {
                            router.refresh();
                            setEditing(false);
                            toast(`Zapisałeś się na godzinę: ${godzina}!`);
                          }}
                          godzina={godzina}
                          dzien={dzien}
                        />
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
