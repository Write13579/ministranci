"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/lib/database/scheme";
import { resetujHaslo } from "@/app/authutils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function SelectUser({ users }: { users: User[] }) {
  const [createdPopupOpen, setCreatedPopupOpen] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(""); //userId
  const [newPassword, setNewPassword] = React.useState("");
  const [changingName, setChangingName] = React.useState("");

  const allUsersNames = users.map((user) => {
    return { value: user.id.toString(), label: user.name };
  });
  const frameworks = allUsersNames;

  return (
    <div id="component">
      <AlertDialog open={createdPopupOpen} onOpenChange={setCreatedPopupOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hasło ministranta zresetowane</AlertDialogTitle>
            <AlertDialogDescription>
              Zapisz dane logowania, ponieważ nie będzie możliwe ich późniejsze
              odzyskanie.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div>
            <div>
              <b>Ministrant:</b> {changingName}
            </div>
            <div>
              <b>Hasło:</b> {newPassword}
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogAction>Zapisałem</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Wybierz ministranta"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command
            filter={(value, search, keywords = []) => {
              const extendValue = value + " " + keywords.join(" ");
              if (extendValue.toLowerCase().includes(search.toLowerCase())) {
                return 1;
              }
              return 0;
            }}
          >
            <CommandInput placeholder="Wpisz imię/nazwisko" />
            <CommandList>
              <CommandEmpty>Nie znaleziono ministranta</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    keywords={[framework.label]}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      setChangingName(framework.label);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div id="buttonSubmit" className="flex justify-center mt-6">
        <Button
          className="bg-red-500 font-bold hover:bg-red-600"
          onClick={async () => {
            setNewPassword(await resetujHaslo(parseInt(value)));
            setCreatedPopupOpen(true);
          }}
        >
          Resetuj komuś hasło
        </Button>
      </div>
    </div>
  );
}
