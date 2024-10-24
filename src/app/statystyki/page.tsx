import { db } from "@/lib/database";
import Statystyki from "./statystyki";
import { getMe } from "../authutils";
import { odznakiToUsers } from "@/lib/database/scheme";
import { eq } from "drizzle-orm";
import { pobierzPunktyZMiesiacemIRokiem } from "../ranking/ranking-actions";

export default async function PageStatystyki() {
  const me = await getMe();

  const myBadges = await db.query.odznakiToUsers.findMany({
    where: eq(odznakiToUsers.userId, me!.id),
    with: { odznaka: true },
  });

  const punktacjeWszystkichUserow = await pobierzPunktyZMiesiacemIRokiem();

  //tu zrobic dodatkowy element dla mojePunktacje o nazwie `srednia` przypisany na podstawie `data`

  const wynikiZDatami = punktacjeWszystkichUserow.map((punktacja) => ({
    wynik: punktacja.punkty,
    data: punktacja.data,
  }));

  // GPT START

  function grupujPoDacie(wyniki: { wynik: number; data: Date }[]): {
    [data: string]: { wynik: number; data: Date }[];
  } {
    return wyniki.reduce((grupy, wynik) => {
      // Jeśli jeszcze nie istnieje grupa dla tej daty, tworzymy nową tablicę
      if (!grupy[wynik.data.toDateString()]) {
        grupy[wynik.data.toDateString()] = [];
      }
      // Dodajemy wynik do odpowiedniej grupy
      grupy[wynik.data.toDateString()].push(wynik);
      return grupy;
    }, {} as { [data: string]: { wynik: number; data: Date }[] });
  }

  // Funkcja do obliczenia średniej dla każdej daty
  function obliczSrednieWyniki(grupowaneWyniki: {
    [data: string]: { wynik: number; data: Date }[];
  }): { [data: string]: number } {
    const srednieWyniki: { [data: string]: number } = {};

    for (const data in grupowaneWyniki) {
      const wynikiNaDzien = grupowaneWyniki[data];
      const suma = wynikiNaDzien.reduce((sum, wynik) => sum + wynik.wynik, 0);
      const srednia = suma / wynikiNaDzien.length;

      // Zapisujemy średnią do obiektu
      srednieWyniki[data] = srednia;
    }

    return srednieWyniki;
  }

  // Grupowanie wyników po dacie
  const zgrupowaneWyniki = grupujPoDacie(wynikiZDatami);

  // Obliczanie średnich wyników dla każdej daty
  const srednieWynikiNaDate = obliczSrednieWyniki(zgrupowaneWyniki);

  // GPT END

  const mojePunktacje = punktacjeWszystkichUserow.filter(
    (punktacja) => punktacja.userId === me!.id
  );

  return <Statystyki myBadges={myBadges} mojePunktacje={mojePunktacje} />;
}
