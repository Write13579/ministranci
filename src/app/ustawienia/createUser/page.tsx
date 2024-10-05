"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import sprawdzCzyZalogowany from "@/app/sprawdzCzyZalogowany";
import { UserRanga } from "@/lib/database/scheme";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { stworzMinistranta } from "@/app/auth-actions";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function CreateUser() {
  const zalogowany = sprawdzCzyZalogowany();
  if (!zalogowany) {
    return;
  }

  const [createdPopupOpen, setCreatedPopupOpen] = useState(false);
  const [createdUser, setCreatedUser] = useState<{
    login: string;
    password: string;
  } | null>(null);

  const formSchema = z.object({
    name: z
      .string()
      .min(4, { message: "Nazwa musi mieć conajmniej 4 znaki." })
      .max(50),
    ranga: z.nativeEnum(UserRanga),
    admin: z.boolean(),
    login: z
      .string()
      .min(4, { message: "Login musi mieć conajmniej 4 znaki." })
      .max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ranga: UserRanga.KOLNIERZ,
      admin: false,
      login: "",
    },
  });

  const userName = form.watch("name");

  useEffect(() => {
    const login = userName
      .toLowerCase()
      .replaceAll(" ", "")
      .replaceAll("-", "");
    form.setValue("login", login);
  }, [userName]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await stworzMinistranta(
      values.login,
      values.name,
      values.ranga,
      values.admin
    );

    if (!res.data) {
      return;
    }

    setCreatedUser(res.data);
    setCreatedPopupOpen(true);
  }

  const rangi = Object.keys(UserRanga) as Array<keyof typeof UserRanga>;

  return (
    <>
      <AlertDialog open={createdPopupOpen} onOpenChange={setCreatedPopupOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konto ministranta utworzone</AlertDialogTitle>
            <AlertDialogDescription>
              Zapisz dane logowania, ponieważ nie będzie możliwe ich późniejsze
              odzyskanie.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div>
            <div>
              <b>Login:</b> {createdUser?.login}
            </div>
            <div>
              <b>Hasło:</b> {createdUser?.password}
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogAction>Zapisałem</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div id="wraper" className="relative">
        <Link href="/ustawienia" className="mx-5 flex absolute top-1">
          <Undo2 className="border-2 border-black/80 rounded-md" />
        </Link>

        <h1 className="font-bold text-2xl flex justify-center m-2 mb-4">
          Stwórz ministranta
        </h1>
        <div
          id="obramowowka tego gownoforma"
          className="border-2 border-black/30 rounded-lg py-2.5 px-3 font-semibold bg-gray-300 m-7"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 m-6 mt-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Imię i nazwisko</FormLabel>
                    <FormControl>
                      <Input placeholder={"Imię i nazwisko"} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ranga"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Ranga</FormLabel>
                    <FormControl>
                      <div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />{" "}
                              {/**nwm co to xd*/}
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {rangi.map((key) => {
                              return (
                                <SelectItem key={key} value={key}>
                                  {key}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="admin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konto administratora?</FormLabel>
                    <FormControl>
                      <div className="items-center flex space-x-2">
                        <Checkbox
                          id="admin"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <Label
                          htmlFor="admin"
                          className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Admin
                        </Label>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Login</FormLabel>
                    <FormControl>
                      <Input placeholder={"Login"} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div id="stworzMinistrantaBtn" className="flex justify-center">
                <Button
                  type="submit"
                  className="font-bold"
                  loading={form.formState.isSubmitting}
                >
                  Stwórz ministranta
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
