import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { House } from "lucide-react";
import Link from "next/link";
import { z } from "zod";

const czytanieResponseSchema = z.discriminatedUnion("error", [
  z.object({ error: z.literal(true) }),
  z.object({
    error: z.literal(false),
    czytanie1: z.object({ title: z.string(), text: z.string() }),
    czytanie2: z.object({ title: z.string(), text: z.string() }).nullable(),
    psalm: z.object({ title: z.string(), text: z.string() }),
    alleluja: z.object({ title: z.string(), text: z.string() }),
    ewangelia: z.object({ title: z.string(), text: z.string() }),
  }),
]);

export default async function Czytanie() {
  const url = "https://czytanie-api.vercel.app/api";
  const res = await fetch(url);
  if (!res.ok) {
    console.log("nie udalo sie pobrac danych");
    return null;
  }
  const dataParse = czytanieResponseSchema.safeParse(await res.json());
  if (dataParse.error || dataParse.data.error) {
    console.log("nie udalo sie pobrac danych");
    return null;
  }

  const { data } = dataParse;

  return (
    <div id="wraper" className="relative">
      <Link href="/" className="mx-5 flex absolute top-1">
        <House />
      </Link>
      <div id="alles" className="px-10 mx-5 flex justify-center flex-col mb-4">
        <h1 className="flex justify-center mb-5 text-3xl font-bold italic">
          CZYTANIE NA DZIŚ
        </h1>

        <Carousel>
          <CarouselContent className="flex">
            <CarouselItem>
              <div
                id="czytanie1"
                className="border border-black rounded-xl p-4"
              >
                <p className="text-xl justify-center flex font-semibold">
                  Pierwsze czytanie:
                </p>
                <p className="my-1 italic">{data.czytanie1.title}</p>
                <p className="leading-relaxed">{data.czytanie1.text}</p>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div id="psalm" className="border border-black rounded-xl p-4">
                <p className="text-xl justify-center flex font-semibold">
                  Psalm:
                </p>
                <p className="my-1 italic">{data.psalm.title}</p>
                <p className="leading-relaxed">{data.psalm.text}</p>
              </div>
            </CarouselItem>
            {data.czytanie2 && (
              <CarouselItem>
                <div
                  id="czytanie2"
                  className="border border-black rounded-xl p-4"
                >
                  <p className="text-xl justify-center flex font-semibold">
                    Drugie czytanie:
                  </p>
                  <p className="my-1 italic">{data.czytanie2.title}</p>
                  <p className="leading-relaxed">{data.czytanie2.text}</p>
                </div>
              </CarouselItem>
            )}
            <CarouselItem>
              <div id="alleluja" className="border border-black rounded-xl p-4">
                <p className="text-xl justify-center flex font-semibold">
                  Alleluja:
                </p>
                <p className="my-1 italic">{data.alleluja.title}</p>
                <p className="leading-relaxed">{data.alleluja.text}</p>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div
                id="ewangelia"
                className="border border-black rounded-xl p-4"
              >
                <p className="text-xl justify-center flex font-semibold">
                  Ewangelia:
                </p>
                <p className="my-1 italic">{data.ewangelia.title}</p>
                <p className="leading-relaxed">{data.ewangelia.text}</p>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}