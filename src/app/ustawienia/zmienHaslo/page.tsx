"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Path, useForm } from "react-hook-form";
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
import { zmienHaslo } from "@/app/auth-actions";
import { toast } from "sonner";

export default function ZmienHaslo() {
  const formSchema = z
    .object({
      stareHaslo: z
        .string()
        .min(4, { message: "Hasło musi mieć conajmniej 4 znaki." })
        .max(25),
      noweHaslo: z
        .string()
        .min(4, { message: "Hasło musi mieć conajmniej 4 znaki." })
        .max(25),
      ponownieNoweHaslo: z
        .string()
        .min(4, { message: "Hasło musi mieć conajmniej 4 znaki." })
        .max(25),
    })
    .superRefine(({ noweHaslo, ponownieNoweHaslo }, ctx) => {
      if (noweHaslo !== ponownieNoweHaslo) {
        ctx.addIssue({
          code: "custom",
          message: "Nowe hasła muszą być takie same",
          path: ["ponownieNoweHaslo"],
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stareHaslo: "",
      noweHaslo: "",
      ponownieNoweHaslo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const errors = await zmienHaslo(values.stareHaslo, values.noweHaslo);
    if (errors.length === 0) {
      toast("Pomyślnie zmieniono hasło!");
      form.reset();
    }
    errors.forEach((formerror) => {
      form.setError(formerror.field as Path<z.infer<typeof formSchema>>, {
        message: formerror.error,
      });
    });
  }

  return (
    <div id="wraper" className="relative">
      <Link href="/ustawienia" className="mx-5 flex absolute top-1">
        <Undo2 className="border-2 border-black/80 rounded-md" />
      </Link>

      <h1 className="font-bold text-2xl flex justify-center m-2 mb-4">
        Zmiana hasła
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
              name="stareHaslo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Stare hasło</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={"Stare hasło"}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="noweHaslo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Nowe hasło</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={"Nowe hasło"}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ponownieNoweHaslo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    Powtórz nowe hasło
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={"Nowe hasło"}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div id="zmienHasloBtn" className="flex justify-center">
              <Button type="submit" className="font-bold">
                Zmień Hasło
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

//mein pass: iNvakbTI4i
