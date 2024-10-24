import { db } from "@/lib/database";
import { Undo2 } from "lucide-react";
import Link from "next/link";

export default function zmienSwojeDanePage() {
  return (
    <div id="wraper" className="relative">
      <Link href="/ustawienia" className="mx-5 flex absolute top-1">
        <Undo2 className="border-2 border-black/80 rounded-md" />
      </Link>

      <h1 className="font-bold text-2xl flex justify-center m-2 mb-4">
        Zmień swoje dane
      </h1>
      <div id="kwadrat">
        tu zmiana wieku i daty przystapienia dla usera (pierdoła)
      </div>
    </div>
  );
}
