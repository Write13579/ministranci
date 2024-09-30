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
import {
  ChartNoAxesCombined,
  CircleUser,
  LogOut,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProfileBar() {
  const [opened, setOpened] = useState(false);

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
            <SheetTitle>Patryk Baraniak</SheetTitle>
            <SheetDescription id="pseudonim">Write13579</SheetDescription>
            <div className="flex flex-col m-1 p-2 gap-y-2">
              <Badge variant="default" className="justify-center">
                animator
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
                  <Link href="ustawienia" onClick={() => setOpened(false)}>
                    <Settings />
                  </Link>
                </Button>
                <Button
                  id="logout"
                  variant="destructive"
                  onClick={() => setOpened(false)}
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
