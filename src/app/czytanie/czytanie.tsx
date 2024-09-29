import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type czytanieType = {
  czytanie1: { title: string; text: string };
  psalm: { title: string; text: string };
  czytanie2: { title: string; text: string };
  alleluja: { title: string; text: string };
  ewangelia: { title: string; text: string };
};

export default async function Czytanie() {
  const url = "https://czytanie-api.vercel.app/api";
  const res = await fetch(url);
  if (!res.ok) {
    console.log("nie udalo sie pobrac danych");
  }
  const data: czytanieType = await res.json();

  return (
    <div id="alles" className="px-10 mx-5 flex justify-center">
      <Carousel>
        <CarouselContent className="flex sm:max-w-xl max-w-80">
          <CarouselItem>
            <div id="czytanie1" className="border border-black rounded-xl p-4">
              <p className="text-xl justify-center flex font-semibold">
                Pierwsze czytanie:
              </p>
              <p className="my-1 italic">{data.czytanie1.title}</p>
              <p className="leading-relaxed">{data.czytanie1.text}</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div
              id="psalm"
              className="border border-black rounded-xl p-4 max-w-xl"
            >
              <p className="text-xl justify-center flex font-semibold">
                Psalm:
              </p>
              <p className="my-1 italic">{data.psalm.title}</p>
              <p className="leading-relaxed">{data.psalm.text}</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div
              id="czytanie2"
              className="border border-black rounded-xl p-4 max-w-xl"
            >
              <p className="text-xl justify-center flex font-semibold">
                Drugie czytanie:
              </p>
              <p className="my-1 italic">{data.czytanie2.title}</p>
              <p className="leading-relaxed">{data.czytanie2.text}</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div
              id="alleluja"
              className="border border-black rounded-xl p-4 max-w-xl"
            >
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
              className="border border-black rounded-xl p-4 max-w-xl"
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
  );
}
