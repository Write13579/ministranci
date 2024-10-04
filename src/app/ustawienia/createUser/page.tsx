"use client";

import sprawdzCzyZalogowany from "@/app/sprawdzCzyZalogowany";

export default function CreateUser() {
  const zalogowany = sprawdzCzyZalogowany();
  if (!zalogowany) {
    return;
  }
  return <div id="alles">createUser</div>;
}
