"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MenuBar() {
  const [opened, setOpened] = useState(false);
  return (
    <div id="menu">
      <Sheet open={opened} onOpenChange={setOpened}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[200px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <div className="flex flex-col gap-5">
              <Link href="/" onClick={() => setOpened(false)}>
                Strona Główna
              </Link>
              <Link href="/czytanie" onClick={() => setOpened(false)}>
                Czytanie na dziś
              </Link>
              <Link href="/listaMinistrantow" onClick={() => setOpened(false)}>
                Lista ministrantów
              </Link>
              <button>4</button>
              <button>5</button>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}