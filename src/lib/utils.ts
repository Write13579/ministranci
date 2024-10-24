import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export const fixDate = (date: Date) => {
  const timezoneOffset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - timezoneOffset);
  return date;
};

export function obliczRozniceMiesiecy(miesiącPrzystąpienia: Date): number {
  const aktualnaData = new Date(); // Pobranie bieżącej daty

  const rokPrzystąpienia = miesiącPrzystąpienia.getFullYear();
  const miesiacPrzystąpienia = miesiącPrzystąpienia.getMonth(); // Zwraca miesiąc od 0 (styczeń) do 11 (grudzień)

  const rokAktualny = aktualnaData.getFullYear();
  const miesiacAktualny = aktualnaData.getMonth();

  const totalMiesiącePrzystąpienia =
    rokPrzystąpienia * 12 + miesiacPrzystąpienia;
  const totalMiesiąceAktualne = rokAktualny * 12 + miesiacAktualny;

  return totalMiesiąceAktualne - totalMiesiącePrzystąpienia; // Zwraca różnicę w miesiącach
}

export function miesiacNaStringaZNumber(numerMSC: number) {
  switch (numerMSC) {
    case 1:
      return "styczeń";
    case 2:
      return "luty";
    case 3:
      return "marzec";
    case 4:
      return "kwiecień";
    case 5:
      return "maj";
    case 6:
      return "czerwiec";
    case 7:
      return "lipiec";
    case 8:
      return "sierpień";
    case 9:
      return "wrzesień";
    case 10:
      return "październik";
    case 11:
      return "listopad";
    case 12:
      return "grudzień";
    default:
      return "ERR";
  }
}
