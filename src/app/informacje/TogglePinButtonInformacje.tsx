"use client";

import { Button } from "@/components/ui/button";
import { Pin, PinOff } from "lucide-react";
import { togglePinInformacja } from "../info-actions";
import { useRouter } from "next/navigation";

export function TogglePinButtonInformacje({
  id,
  pinned,
}: {
  id: number;
  pinned: boolean;
}) {
  const ruter = useRouter();
  return (
    <Button
      size="icon"
      variant={pinned ? "default" : "outline"}
      onClick={async () => {
        await togglePinInformacja(id);
        ruter.refresh();
      }}
    >
      {pinned ? <PinOff /> : <Pin />}
    </Button>
  );
}
