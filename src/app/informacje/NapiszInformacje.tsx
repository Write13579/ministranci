import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { napiszInformacje } from "../info-actions";

export default function NapiszInformacje() {
  const infoSchema = z.object({
    tytul: z
      .string()
      .min(4, { message: "Tytuł musi mieć conajmniej 4 znaki." })
      .max(256),

    tresc: z
      .string()
      .min(4, { message: "Treść musi mieć conajmniej 4 znaki." })
      .max(700),
  });

  const form = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      tytul: "",
      tresc: "",
    },
  });

  async function onSubmit(values: z.infer<typeof infoSchema>) {
    const res = await napiszInformacje(values.tytul, values.tresc);

    if (!res.data) {
      return;
    }
  }
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 m-6 mt-4"
            >
              <FormField
                control={form.control}
                name="tytul"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Tytuł</FormLabel>
                    <FormControl>
                      <Input placeholder={"Tytuł"} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tresc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Treść</FormLabel>
                    <FormControl>
                      <Input placeholder={"Treść"} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div id="zmienHasloBtn" className="flex justify-center">
                <Button
                  type="submit"
                  className="font-bold"
                  loading={form.formState.isSubmitting}
                >
                  Opublikuj informację
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
