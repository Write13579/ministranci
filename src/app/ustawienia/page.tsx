"use client";

import { House } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Wyloguj } from "../auth-actions";

export default function ustawienia() {
  return (
    <div id="wraper" className="relative">
      <Link href="/" className="mx-5 flex absolute top-1">
        <House />
      </Link>
      <div id="alles">
        <h1 className="font-bold text-2xl flex justify-center m-2 mb-4">
          Ustawienia
        </h1>
        <div id="opcje" className="grid grid-cols-1 mx-3 my-2 gap-3">
          <Link href={"/ustawienia/zmienHaslo"}>
            <div
              id="changePassword"
              className="border-2 border-black/30 rounded-lg py-2.5 px-3 font-semibold bg-gray-300"
            >
              Zmień hasło
            </div>
          </Link>
          <Link href={"/ustawienia/wiadomoscDoAnimatora"}>
            <div
              id="messageToAnimator"
              className="border-2 border-black/30 rounded-lg py-2.5 px-3 font-semibold bg-gray-300"
            >
              Anonimowa wiadomość do animatora
            </div>
          </Link>
          <Link href={"ustawienia/createUser"}>
            <div
              id="createUser"
              className="border-2 border-blue-500 rounded-lg py-2.5 px-3 font-semibold bg-blue-300 text-blue-800"
            >
              Stwórz ministanta
            </div>
          </Link>
          <div
            id=""
            className="border-2 border-black/30 rounded-lg py-2.5 px-3 font-semibold bg-gray-300"
          >
            x
          </div>
          <button
            id="logout"
            className="border-2 border-red-500 rounded-lg py-2.5 px-3 font-semibold bg-red-300 text-red-800"
            onClick={async () => {
              await Wyloguj();
              toast("Wylogowano pomyślnie!");
            }}
          >
            Wyloguj się
          </button>
        </div>
      </div>
    </div>
  );
}
