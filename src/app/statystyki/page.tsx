import { db } from "@/lib/database";
import Statystyki from "./statystyki";
import { getMe } from "../authutils";
import { odznakiToUsers } from "@/lib/database/scheme";
import { eq } from "drizzle-orm";
import { pobierzPunktyZMiesiacemIRokiem } from "../ranking/ranking-actions";

export interface SredniaWynik {
  data: Date;
  srednia: number;
}

export default async function PageStatystyki() {
  const me = await getMe();

  const myBadges = await db.query.odznakiToUsers.findMany({
    where: eq(odznakiToUsers.userId, me!.id),
    with: { odznaka: true },
  });

  // GPT START

  interface Wynik {
    wynik: number;
    data: Date;
  }

  // Funkcja do grupowania wyników po dacie
  function grupujPoDacie(wyniki: Wynik[]): { [data: string]: Wynik[] } {
    return wyniki.reduce((grupy, wynik) => {
      const dataString = wynik.data.toDateString();
      if (!grupy[dataString]) {
        grupy[dataString] = [];
      }
      grupy[dataString].push(wynik);
      return grupy;
    }, {} as { [data: string]: Wynik[] });
  }

  // Funkcja do obliczenia średniej dla każdej daty
  function obliczSrednieWyniki(grupowaneWyniki: {
    [data: string]: Wynik[];
  }): SredniaWynik[] {
    const srednieWyniki: SredniaWynik[] = [];

    for (const dataString in grupowaneWyniki) {
      const wynikiNaDzien = grupowaneWyniki[dataString];

      // Sumowanie wyników
      const suma = wynikiNaDzien.reduce((sum, wynik) => {
        return sum + wynik.wynik;
      }, 0);

      // Obliczenie średniej
      const srednia = parseFloat((suma / wynikiNaDzien.length).toFixed(2));

      const data = wynikiNaDzien[0].data;

      srednieWyniki.push({
        data: data,
        srednia: srednia,
      });
    }

    return srednieWyniki;
  }

  interface Punktacja {
    punkty: number;
    userId: number;
    miesiac: number;
    rok: number;
    data: Date;
  }

  interface PunktacjaZeSrednia extends Punktacja {
    srednia: number; // Dodajemy średnią jako wymaganą właściwość
  }

  // Funkcja przypisująca średnie do każdego obiektu na podstawie daty
  function przypiszSrednieDoPunktacji(
    punktacje: Punktacja[],
    srednieWyniki: { data: Date; srednia: number }[]
  ): PunktacjaZeSrednia[] {
    return punktacje.map((punktacja) => {
      // Znajdujemy średnią na podstawie daty
      const odpowiedniaSrednia = srednieWyniki.find(
        (sredniaWynik) =>
          sredniaWynik.data.toDateString() === punktacja.data.toDateString()
      );

      // Jeśli średnia dla tej daty istnieje, zwracamy nowy obiekt PunktacjaZeSrednia
      return {
        ...punktacja,
        srednia: odpowiedniaSrednia ? odpowiedniaSrednia.srednia : 0, // Zwracamy średnią, lub 0 jeśli nie znaleziono
      };
    });
  }

  // Wywołanie funkcji:

  const punktacjeWszystkichUserow = await pobierzPunktyZMiesiacemIRokiem();

  const wynikiZDatami = punktacjeWszystkichUserow.map((punktacja) => ({
    wynik: Number(punktacja.punkty), // Konwersja punktów na number
    data: punktacja.data,
  }));

  // Grupowanie wyników po dacie
  const zgrupowaneWyniki = grupujPoDacie(wynikiZDatami);

  // Obliczanie średnich wyników dla każdej daty
  const srednieWynikiNaDate = obliczSrednieWyniki(zgrupowaneWyniki);

  //console.log("Średnie wyniki na datę:", srednieWynikiNaDate);

  // Przypisujemy średnie do odpowiednich obiektów
  const punktacjeZeSrednimi: PunktacjaZeSrednia[] = przypiszSrednieDoPunktacji(
    punktacjeWszystkichUserow,
    srednieWynikiNaDate
  );

  //console.log("Punktacje ze średnimi:", punktacjeZeSrednimi);

  //GPT END

  const mojePunktacje = punktacjeZeSrednimi.filter(
    (punktacja) => punktacja.userId === me!.id
  );

  return <Statystyki myBadges={myBadges} mojePunktacje={mojePunktacje} />;
}
