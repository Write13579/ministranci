"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Textarea } from "@/components/ui/textarea";
import { AvatarImage } from "@radix-ui/react-avatar";
import { House, PencilLine, User } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

export default function Statystyki() {
  const chartConfig = {
    userWynik: {
      label: "Twój wynik",
      color: "#2563eb",
    },
    sredniWynik: {
      label: "średni wynik",
      color: "#FF0000",
    },
  } satisfies ChartConfig;

  const chartData = [
    { miesiac: "Styczeń 2024", userWynik: 60, sredniWynik: 50 },
    { miesiac: "Luty 2024", userWynik: 65, sredniWynik: 120 },
    { miesiac: "Marzec 2024", userWynik: 42, sredniWynik: 10 },
    { miesiac: "Kwiecień 2024", userWynik: 12, sredniWynik: 50 },
    { miesiac: "Luty 2024", userWynik: 101, sredniWynik: 86 },
  ];

  return (
    <div id="wraper" className="relative">
      <Link href="/" className="mx-5 flex absolute top-1">
        <House />
      </Link>
      <div id="alles">
        <div id="general" className="flex justify-center items-center flex-col">
          <Avatar className="size-36">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div id="nazwa" className="items-center flex flex-col">
            <div id="fullName" className="my-3">
              <span id="imie">Patryk </span>
              <span id="nazwisko">Baraniak</span>
            </div>
            <div id="pseudonimPlace" className="mt-1 relative">
              <span id="pseudonim" className="text-gray-500">
                Write13579
              </span>
              <Button size={"icon"} className="size-5 ml-1.5 absolute top-0.5">
                <PencilLine className="size-4" />
              </Button>
            </div>
            <div
              id="opis"
              className="grid w-full gap-1 my-4 justify-center items-center text-center"
            >
              <Textarea placeholder="Napisz coś o sobie" />
              <Button className="w-full" size="icon">
                Zatwierdź
              </Button>
            </div>
          </div>
          <div id="badges" className=" my-3 grid gap-2 grid-cols-2">
            <Badge className="bg-red-600 flex justify-center hover:bg-red-700">
              Animator
            </Badge>
            <Badge className="bg-yellow-600 flex justify-center hover:bg-yellow-700">
              2 miejsce sierpień 2024
            </Badge>
            <Badge className="bg-purple-500 flex justify-center hover:bg-purple-600">
              1 miejsce różaniec 2023
            </Badge>
          </div>
        </div>
        <div id="stats" className="my-6">
          <Card>
            <CardHeader className="flex justify-center text-center">
              <CardTitle>Statystyki</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    top: 40,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="miesiac"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />{" "}
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey={"userWynik"}
                    fill="var(--color-userWynik)"
                    radius={3}
                  >
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Bar>
                  <Bar
                    dataKey={"sredniWynik"}
                    fill="var(--color-sredniWynik"
                    radius={3}
                  >
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Bar>
                  <ChartTooltip />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}