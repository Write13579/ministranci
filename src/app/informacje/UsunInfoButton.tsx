"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { usunInformacje } from "../info-actions";
import { useRouter } from "next/navigation";

export function UsunButtonInformacje({ id }: { id: number }) {
  const ruter = useRouter();
  return (
    <Button
      size="icon"
      className="bg-red-600 hover:bg-red-500"
      onClick={async () => {
        await usunInformacje(id);
        ruter.refresh;
      }}
    >
      <Trash />
    </Button>
  );
}
