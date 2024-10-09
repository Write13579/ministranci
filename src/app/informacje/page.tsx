import { db } from "@/lib/database";
import { House } from "lucide-react";
import Link from "next/link";
import { UsunButtonInformacje } from "./UsunInfoButton";
import { TogglePinButtonInformacje } from "./TogglePinButtonInformacje";
import { desc } from "drizzle-orm";
import { infos } from "@/lib/database/scheme";
import { getMe } from "../authutils";
import NapiszInformacje from "./NapiszInformacje";
import clsx from "clsx";

export default async function PageInformacje() {
  const allInfos = await db.query.infos.findMany({
    orderBy: [desc(infos.pinned), desc(infos.createdAt)],
  });

  function formatDate(date: Date) {
    const dzien = String(date.getDate()).padStart(2, "0");
    const miesiac = String(date.getMonth() + 1).padStart(2, "0");
    const rok = date.getFullYear();

    const godzina = String(date.getHours()).padStart(2, "0");
    const minuta = String(date.getMinutes()).padStart(2, "0");

    return `${dzien}-${miesiac}-${rok} ${godzina}:${minuta}`;
  }

  const user = await getMe();

  return (
    <div id="wraper" className="relative">
      <Link href="/" className="mx-5 flex absolute top-1">
        <House />
      </Link>
      <div id="alles">
        <h1 className="flex justify-center mb-5 text-3xl font-bold italic">
          INFORMACJE
        </h1>
        <div id="kafelki">
          <div className="flex mx-10 mb-6 text-center justify-center">
            <NapiszInformacje />
          </div>
          {allInfos.map((info) => (
            <div
              key={info.id}
              className={clsx(
                "border-2 border-black/50 rounded-xl p-3 m-3 bg-gray-300/60 flex justify-between items-center",
                {
                  "border-red-600/80 border-4 bg-red-300/15":
                    info.pinned === true,
                }
              )}
            >
              <div>
                <h2 className="mb-3 font-semibold">{info.tytul}</h2>
                <div>{info.tresc}</div>
                <div className="flex flex-col gap-1 mt-4 italic text-gray-500 text-sm">
                  <p>Opublikowano: {formatDate(info.createdAt)}</p>
                  {/*<p>Ostatnia aktualizacja: {formatDate(info.updatedAt)}</p>**/}
                </div>
              </div>
              {user?.admin && (
                <div id="buttony" className="flex flex-col gap-6">
                  <TogglePinButtonInformacje
                    id={info.id}
                    pinned={info.pinned}
                  />
                  {/**<Button size="icon"> EDIT </Button>*/}
                  <UsunButtonInformacje id={info.id} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
