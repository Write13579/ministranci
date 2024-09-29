import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { House } from "lucide-react";
import Link from "next/link";

export default function ListaMinistrantow() {
  return (
    <div id="wraper" className="relative">
      <Link href="/" className="mx-5 flex absolute top-1">
        <House />
      </Link>
      <div id="alles">
        <h1 className="flex justify-center items-center text-3xl mb-8 font-bold italic">
          LISTA MINISTRANTÓW
        </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imię</TableHead>
              <TableHead>Nazwisko</TableHead>
              <TableHead>Ranga</TableHead>

              <TableHead>Wiek</TableHead>
              <TableHead>Miesiąc przystąpienia</TableHead>
              <TableHead>Czas służby (w miesiącach)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Patryk</TableCell>
              <TableCell>Baraniak</TableCell>
              <TableCell>
                <Badge>Animator</Badge>
              </TableCell>
              <TableCell>20</TableCell>
              <TableCell>dawno temu</TableCell>
              <TableCell>dlugo</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tomek</TableCell>
              <TableCell>Kowalski</TableCell>
              <TableCell>
                <Badge>Kandydat</Badge>
              </TableCell>
              <TableCell>8</TableCell>
              <TableCell>09.2021</TableCell>
              <TableCell>36</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
