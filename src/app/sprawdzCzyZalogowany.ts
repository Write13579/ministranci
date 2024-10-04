"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function sprawdzCzyZalogowany() {
  const router = useRouter();
  const user = useAuth();

  if (!user || user === null) {
    router.push("/zaloguj");
    return false;
  }
  return true;
}
