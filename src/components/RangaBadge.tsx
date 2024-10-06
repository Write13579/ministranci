import clsx from "clsx";
import { Badge } from "./ui/badge";
import { UserRanga } from "@/lib/database/scheme";

export default function RangaBadge({ ranga }: { ranga: string }) {
  return (
    <Badge
      className={clsx({
        "bg-red-500 hover:bg-red-400": ranga === UserRanga.ANIMATOR,
        "bg-cyan-500 hover:bg-cyan-400": ranga === UserRanga.ALBA,
        "bg-black hover:bg-gray-700": ranga === UserRanga.CZARNY,
        "bg-indigo-500 hover:bg-indigo-400": ranga === UserRanga.KOLNIERZ,
        "bg-purple-500 hover:bg-purple-400": ranga === UserRanga.BEZKOLNIERZ,
        "bg-green-500 hover:bg-green-400": ranga === UserRanga.KANDYDAT,
      })}
    >
      {ranga}
    </Badge>
  );
}
