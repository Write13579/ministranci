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
import ColorPicker from "./ColorPicker";
import { MultiSelect } from "./MultiSelect";
import { User } from "@/lib/database/scheme";
import { stworzIDodajOdznake } from "./badges-actions";
import { toast } from "sonner";

const FormSchema = z.object({
  napisOdznaki: z.string().min(3, {
    message: "Odznaka musi mieć conajmniej 3 litery",
  }),
  kolorOdznaki: z.string(),
  zbiorMinistrantow: z.array(z.string()),
});

export function AddOdznaka({ ministranci }: { ministranci: User[] }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      napisOdznaki: "",
      kolorOdznaki: "",
      zbiorMinistrantow: [],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await stworzIDodajOdznake(
      data.napisOdznaki,
      data.kolorOdznaki,
      data.zbiorMinistrantow.map(Number)
    );

    toast("Odznaki zostały przyznane!");
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex justify-center flex-col items-center w-full"
      >
        <FormField
          control={form.control}
          name="napisOdznaki"
          render={({ field }) => (
            <FormItem className="w-80">
              <FormLabel>Krótki napis na odznace</FormLabel>
              <FormControl>
                <Input
                  placeholder="np. Ministrant miesiąca sierpień 2024"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kolorOdznaki"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kolor odznaki</FormLabel>
              <FormControl>
                <ColorPicker {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zbiorMinistrantow"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Komu przyznać?</FormLabel>
              <FormControl>
                <MultiSelect
                  options={ministranci.map((ministrant) => ({
                    label: ministrant.name,
                    value: ministrant.id.toString(),
                  }))}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Wybierz ministrantów"
                  variant="inverted"
                  animation={2}
                  maxCount={3}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={form.formState.isSubmitting} type="submit">
          Dodaj
        </Button>
      </form>
    </Form>
  );
}
