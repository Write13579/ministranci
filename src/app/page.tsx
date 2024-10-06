import {
  BookOpen,
  Calendar,
  CalendarX,
  Info,
  LogIn,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { getMe } from "./authutils";
import { db } from "@/lib/database";
import { eq } from "drizzle-orm";
import { infos } from "@/lib/database/scheme";

export default async function Home() {
  const dzien = new Date().getDate();
  const miesiacx = new Date().getMonth() + 1;
  const miesiac = miesiacx < 10 ? "0" + miesiacx : miesiacx;
  const rok = new Date().getFullYear();
  const dzisiaj = dzien + "." + miesiac + "." + rok + "r.";

  const user = await getMe();

  const firstName = user?.name.split(" ")[0];

  const pinnedInfo = await db.query.infos.findFirst({
    where: eq(infos.pinned, true),
  });

  return (
    <div id="alles" className="px-4">
      <p id="data">{dzisiaj}</p>
      <h1 className="py-12 text-4xl">
        Szczęść Boże, {user === null ? "ministrancie" : firstName}!
      </h1>
      {user ? (
        <div id="kafleAllesSzmato">
          {pinnedInfo ? (
            <div
              id="infoKafelek"
              className="border-2 border-gray-600/40 p-5 rounded-lg flex
        justify-center items-center mb-8 bg-gray-600/5 flex-col"
            >
              <h1 className="mb-4 font-semibold italic">
                PRZYPIĘTA INFORMACJA
              </h1>
              <div className="text-center font-bold mb-3 mt-1">
                {pinnedInfo.tytul}
              </div>
              <div className="text-center">{pinnedInfo.tresc}</div>
            </div>
          ) : (
            <div
              id="infoKafelek"
              className="border-2 border-gray-600/40 p-5 rounded-lg flex
    justify-center items-center mb-8 bg-gray-600/5 flex-col"
            >
              <h1 className=" font-semibold italic">
                BRAK PRZYPIĘTEJ INFORMACJI
              </h1>
            </div>
          )}

          <div id="kafelki" className="grid grid-cols-2 gap-5">
            <div className="border-2 border-red-600/40 p-5 rounded-lg flex justify-center items-center gap-1 bg-red-600/5">
              <span>Punkty łącznie: </span>
              <span className="text-red-600 text-2xl font-bold [text-shadow:_0_0_30px]">
                100pkt
              </span>
            </div>

            <div className="border-2 border-green-500/40 p-5 rounded-lg flex justify-center items-center gap-1 bg-green-500/5">
              <span>Miejsce w rankingu: </span>
              <Trophy size={40} className="pt-1" />
              <span className="text-green-500 text-4xl font-bold [text-shadow:_0_0_30px]">
                4
              </span>
            </div>

            <Link
              href="/planNiedzielny"
              className="border-2 border-[#4287f5]/40 p-5 justify-center flex rounded-lg items-center gap-2 flex-col bg-[#4287f5]/5"
            >
              <span>plan niedzielny</span>
              <CalendarX size={35} color="#4287f5" />
            </Link>

            <Link
              href="/planTygodniowy"
              className="border-2 border-[#0f0f75]/40 p-5 justify-center flex rounded-lg items-center gap-2 flex-col bg-[#0f0f75]/5"
            >
              <span>plan tygodniowy</span>
              <Calendar size={35} color="#0f0f75" />
            </Link>

            <Link
              href="/informacje"
              className="border-2 border-[#657322]/40 p-5 justify-center flex rounded-lg items-center gap-2 flex-col bg-[#657322]/5"
            >
              <span>informacje</span>
              <Info size={35} color="#657322" />
            </Link>

            <Link
              href="/czytanie"
              className="border-2 border-[#82311f]/40 p-5 justify-center flex rounded-lg items-center gap-2 flex-col bg-[#82311f]/5"
            >
              <span>dzisiejsze czytanie</span>
              <BookOpen size={35} color="#82311f" />
            </Link>
          </div>
        </div>
      ) : (
        <div id="allesDla!user">
          <div id="unloggedin" className="grid gap-4">
            <Link
              href="/zaloguj"
              className="border-2 border-[#1710cc]/40 p-5 justify-center flex rounded-lg items-center gap-2 flex-col bg-[#1710cc]/5"
            >
              <span>Zaloguj się</span>
              <LogIn size={35} color="#1710cc" />
            </Link>
            <Link
              href="/czytanie"
              className="border-2 border-[#82311f]/40 p-5 justify-center flex rounded-lg items-center gap-2 flex-col bg-[#82311f]/5"
            >
              <span>dzisiejsze czytanie</span>
              <BookOpen size={35} color="#82311f" />
            </Link>
          </div>

          <div id="obrazek" className="w-20 absolute right-5 bottom-5">
            <img
              src="/wavingPepe.gif"
              alt="wavingPepe.gif"
              className="w-full h-full scale-x-[-1]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
