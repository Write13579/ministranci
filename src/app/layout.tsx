import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CircleUser, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import MenuBar from "./MenuBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ministranci Tychy-Czulow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased bg-gray-200`}>
        <div
          id="topNavbar"
          className=" w-full bg-gray-300 p-4 items-center justify-between flex mb-4"
        >
          <MenuBar />

          <h1 id="title" className="text-xl font-semibold animate-Shake">
            <Link href="/">Panel Ministrancki</Link>
          </h1>

          <div id="profil">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <CircleUser />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px]">
                <SheetHeader>
                  <SheetTitle>Patryk Baraniak</SheetTitle>
                  <SheetDescription>Write13579</SheetDescription>
                  <div className="flex flex-col m-1 p-2 gap-y-2">
                    <Badge variant="default" className="justify-center">
                      animator
                    </Badge>
                    <span
                      id="punkty"
                      className="items-center text-center justify-center italic"
                    >
                      <span>Zebrano </span>
                      <span>100pkt</span>
                    </span>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
