import { House } from "lucide-react";
import Link from "next/link";

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
          <div
            id=""
            className="border-2 border-black/30 rounded-lg py-2.5 px-3 font-semibold bg-gray-300"
          >
            x
          </div>
          <div
            id=""
            className="border-2 border-black/30 rounded-lg py-2.5 px-3 font-semibold bg-gray-300"
          >
            x
          </div>
          <div
            id="logout"
            className="border-2 border-red-500 rounded-lg py-2.5 px-3 font-semibold bg-red-300 text-red-800"
          >
            Wyloguj się
          </div>
        </div>
      </div>
    </div>
  );
}
