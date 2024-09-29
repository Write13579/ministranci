import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const dzien = new Date().getDate();
  const miesiacx = new Date().getMonth() + 1;
  const miesiac = miesiacx < 10 ? "0" + miesiacx : miesiacx;
  const rok = new Date().getFullYear();
  const dzisiaj = dzien + "." + miesiac + "." + rok + "r.";

  return (
    <div id="alles">
      {dzisiaj}
      <div id="linki">
        <Link href="/czytanie">dzisiejsze czytanie</Link>
      </div>
    </div>
  );
}
