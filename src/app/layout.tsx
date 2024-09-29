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
          className=" w-full bg-gray-300 p-4 items-center justify-between relative flex mb-5"
        >
          <div id="menu">
            <Sheet>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent side="left" className="w-[200px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <div className="flex flex-col gap-5">
                    <Link href="/">Home</Link>
                    <Link href="/czytanie">Czytanie na dziś</Link>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

          <h1
            id="title"
            className="absolute left-1/2 transform -translate-x-1/2"
          >
            Ministranci
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
                    <div
                      id="punkty"
                      className="flex items-center text-center justify-center gap-1 italic"
                    >
                      <label>Zebrano</label>
                      <p>100pkt</p>
                    </div>
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
