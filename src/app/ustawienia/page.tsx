"use client";

import { House } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Wyloguj } from "../auth-actions";
import { useAuth } from "@/lib/auth";
import NapiszInformacje from "../informacje/NapiszInformacje";
import { useRouter } from "next/navigation";

export default function Ustawienia() {
  const user = useAuth();
  const router = useRouter();
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
          {user!.admin && (
            <div id="dlaAdmina" className="gap-3 grid">
              <Link href={"ustawienia/createUser"}>
                <div
                  id="createUser"
                  className="border-2 border-blue-500 rounded-lg py-2.5 px-3 font-semibold bg-blue-300 text-blue-800"
                >
                  Stwórz ministanta
                </div>
              </Link>

              <NapiszInformacje />

              <Link href={"ustawienia/punktacja"}>
                <div
                  id="createUser"
                  className="border-2 border-blue-500 rounded-lg py-2.5 px-3 font-semibold bg-blue-300 text-blue-800"
                >
                  Przyznaj punkty
                </div>
              </Link>
              <Link href={"ustawienia/przyznajOdznake"}>
                <div
                  id="createUser"
                  className="border-2 border-blue-500 rounded-lg py-2.5 px-3 font-semibold bg-blue-300 text-blue-800"
                >
                  Przyznaj odznakę
                </div>
              </Link>
              <Link href={"ustawienia/ustawKomusNoweHaslo"}>
                <div
                  id="createUser"
                  className="border-2 border-blue-500 rounded-lg py-2.5 px-3 font-semibold bg-blue-300 text-blue-800"
                >
                  Resetuj ministantowi hasło
                </div>
              </Link>
            </div>
          )}

          <button
            id="logout"
            className="border-2 border-red-500 rounded-lg py-2.5 px-3 font-semibold bg-red-300 text-red-800"
            onClick={async () => {
              await Wyloguj();
              router.push("/");
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
