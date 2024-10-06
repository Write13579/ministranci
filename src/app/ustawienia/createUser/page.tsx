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
import { CalendarIcon, Undo2 } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn, fixDate, obliczRozniceMiesiecy } from "@/lib/utils";
import { format } from "date-fns";

export default function CreateUser() {
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
    miesiacPrzystapienia: z.date(),
    wiek: z.coerce
      .number({
        required_error: "Calories is required",
        invalid_type_error: "Calories must be a number",
      })
      .int(),
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
      values.admin,
      values.wiek,
      fixDate(values.miesiacPrzystapienia)
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
                name="wiek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">wiek</FormLabel>
                    <FormControl>
                      <Input placeholder={"Wiek"} type="number" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="miesiacPrzystapienia"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data przystąpienia</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Wybierz datę przystąpienia</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

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
