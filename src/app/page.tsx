import { BookOpen, Trophy } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const dzien = new Date().getDate();
  const miesiacx = new Date().getMonth() + 1;
  const miesiac = miesiacx < 10 ? "0" + miesiacx : miesiacx;
  const rok = new Date().getFullYear();
  const dzisiaj = dzien + "." + miesiac + "." + rok + "r.";

  return (
    <div id="alles" className="px-4">
      <p id="data">{dzisiaj}</p>
      <h1 className="py-12 text-4xl">Szczęść Boże, Patryk!</h1>
      <div
        id="infoKafelek"
        className="border-2 border-gray-600/40 p-5 rounded-lg flex
        justify-center items-center mb-8 bg-gray-600/5 flex-col"
      >
        <h1 className="mb-4 font-semibold italic">PRZYPIĘTA INFORMACJA</h1>
        <div className="text-center">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
          possimus adipisci ad obcaecati atque. Repudiandae earum impedit
          delectus eos officiis repellendus voluptate, nulla sed mollitia
          provident, asperiores dolores quod molestiae.
        </div>
      </div>
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

        <div className="border-2 border-yellow-600/40 p-5 rounded-lg flex justify-center items-center gap-1 bg-yellow-600/5">
          <span>Punkty za ostatni miesiąc: </span>
          <span className="text-yellow-600 text-2xl font-bold [text-shadow:_0_0_30px]">
            50pkt
          </span>
        </div>

        <Link
          href="/czytanie"
          className="border-2 border-[#82311f]/40 p-5 justify-center flex rounded-lg items-center gap-2 flex-col bg-[#82311f]/5"
        >
          <span>dzisiejsze czytanie</span>
          <BookOpen size={35} color="#82311f" />
        </Link>
      </div>
    </div>
  );
}
