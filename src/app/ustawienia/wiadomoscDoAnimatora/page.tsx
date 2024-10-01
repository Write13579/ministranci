"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function wiadomoscDoAnimatora() {
  const [wiadomosc, setwiadomosc] = useState<string>("");
  return (
    <div id="wraper">
      <Link href="/ustawienia" className="w-fit flex mx-8">
        <Undo2 className="border-2 border-black/80 rounded-md" />
      </Link>
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
      <Toaster />
    </div>
  );
}
