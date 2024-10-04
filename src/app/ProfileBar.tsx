"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "@/lib/database/scheme";
import {
  ChartNoAxesCombined,
  CircleUser,
  LogOut,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Wyloguj } from "./auth-actions";

export default function ProfileBar({ user }: { user: User | null }) {
  const [opened, setOpened] = useState(false);
  if (!user) {
    return (
      <Link href={"/zaloguj"}>
        <Button variant="ghost" size="icon">
          <CircleUser />
        </Button>
      </Link>
    );
  }
  return (
    <div id="profil">
      <Sheet open={opened} onOpenChange={setOpened}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <CircleUser />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[250px]">
          <SheetHeader>
            <SheetTitle>{user.name}</SheetTitle>
            <SheetDescription id="pseudonim">{user.pseudonim}</SheetDescription>
            <div className="flex flex-col m-1 p-2 gap-y-2">
              <Badge variant="default" className="justify-center">
                {user.ranga.toLowerCase()}
              </Badge>
              <span
                id="punkty"
                className="items-center text-center justify-center italic my-4"
              >
                <span>Zebrałeś łącznie </span>
                <span>100pkt</span>
              </span>
              <div id="buttony" className="gap-2 flex">
                <Button id="statystyki" variant="outline">
                  <Link href="/statystyki" onClick={() => setOpened(false)}>
                    <ChartNoAxesCombined />
                  </Link>
                </Button>
                <Button id="ustawienia" variant="outline">
                  <Link href="/ustawienia" onClick={() => setOpened(false)}>
                    <Settings />
                  </Link>
                </Button>
                <Button
                  id="logout"
                  variant="destructive"
                  onClick={async () => {
                    setOpened(false);
                    await Wyloguj();
                    toast("Wylogowano pomyślnie!");
                  }}
                >
                  <LogOut />
                </Button>
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
