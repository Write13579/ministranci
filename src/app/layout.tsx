import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Link from "next/link";
import MenuBar from "./MenuBar";
import ProfileBar from "./ProfileBar";
import { Toaster } from "@/components/ui/sonner";
import { getMe } from "./authutils";
import AuthProvider from "@/lib/auth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ministranci Tychy-Czulow",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased bg-gray-200`}>
        <AuthProvider user={user}>
          <div
            id="topNavbar"
            className=" w-full bg-gray-300 p-4 items-center justify-between flex mb-4"
          >
            <MenuBar />
            <h1 id="title" className="text-xl font-semibold animate-Shake">
              <Link href="/">Panel Ministrancki</Link>
            </h1>
            <ProfileBar />
          </div>
          {children} <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
