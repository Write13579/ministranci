"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { usunInformacje } from "../info-actions";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function UsunButtonInformacje({ id }: { id: number }) {
  const ruter = useRouter();
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" className="bg-red-600 hover:bg-red-500">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Czy na pewno chcesz usunąć informację?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Nie da się tego cofnąć!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                await usunInformacje(id);
                ruter.refresh();
              }}
            >
              Usuń
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
