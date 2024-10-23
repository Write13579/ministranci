"use client";

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
import { toast } from "sonner";
import { Wyloguj } from "./auth-actions";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import RangaBadge from "@/components/RangaBadge";

export default function ProfileBar() {
  const user = useAuth();
  const router = useRouter();

  const [opened, setOpened] = useState(false);
  if (!user || user == null) {
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
            <SheetTitle className="flex justify-center">{user.name}</SheetTitle>
            <SheetDescription id="pseudonim" className="flex justify-center">
              {user.pseudonim}
            </SheetDescription>
            <div className="flex flex-col m-1 p-2 gap-y-2">
              <RangaBadge ranga={user.ranga} />
              <span
                id="punkty"
                className="items-center text-center justify-center italic my-4"
              >
                <span>Zebrałeś łącznie </span>
                <span>100pkt</span>
              </span>
              <div id="buttony" className="gap-2 flex">
                {" "}
                <Link href="/statystyki" onClick={() => setOpened(false)}>
                  <Button id="statystyki" variant="outline">
                    <ChartNoAxesCombined />
                  </Button>
                </Link>{" "}
                <Link href="/ustawienia" onClick={() => setOpened(false)}>
                  <Button id="ustawienia" variant="outline">
                    <Settings />
                  </Button>
                </Link>
                <Button
                  id="logout"
                  variant="destructive"
                  onClick={async () => {
                    setOpened(false);
                    await Wyloguj();
                    router.push("/");
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
