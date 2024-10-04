"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function WiadomoscDoAnimatora() {
  const [wiadomosc, setwiadomosc] = useState<string>("");
  return (
    <div id="wraper" className="relative">
      <Link href="/ustawienia" className="mx-5 flex absolute top-1">
        <Undo2 className="border-2 border-black/80 rounded-md" />
      </Link>
      <h1 className="font-bold text-2xl flex justify-center m-2 mb-4">
        Wiadomość do animatora
      </h1>
      <div
        id="obramowowka"
        className="border-2 border-black/30 rounded-lg py-2.5 px-3 font-semibold bg-gray-300 m-7"
      >
        <div id="tresc" className="grid w-full gap-4">
          <Label htmlFor="message" className="font-semibold ml-0.5 text-base">
            Treść:
          </Label>
          <Textarea
            placeholder="Wpisz tutaj swoją wiadomość"
            id="message"
            value={wiadomosc}
            onChange={(e) => setwiadomosc(e.target.value)}
          />
          <Button
            onClick={() => {
              toast("Wiadomość wysłana!");
              setwiadomosc("");
            }}
          >
            Wyślij
          </Button>
        </div>
      </div>
    </div>
  );
}
