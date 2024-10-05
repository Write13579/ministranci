import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NapiszInformacje() {
  return (
    <Dialog>
      <DialogTrigger>
        <div
          id="createUser"
          className="border-2 border-blue-500 rounded-lg py-2.5 px-3 font-semibold text-left bg-blue-300 text-blue-800 hover:cursor-pointer"
        >
          Napisz informację
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Napisz informację</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tytuł
            </Label>
            <Input id="tytul" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Treść
            </Label>
            <Input id="tresc" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Dodaj Informację</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
