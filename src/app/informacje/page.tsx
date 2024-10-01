import { House } from "lucide-react";
import Link from "next/link";

export default function PageInformacje() {
  return (
    <div id="wraper" className="relative">
      <Link href="/" className="mx-5 flex absolute top-1">
        <House />
      </Link>
      <div id="alles">
        <h1 className="flex justify-center font-bold text-2xl m-5 mb-7">
          Informacje
        </h1>
        <div id="kafelki">
          <div
            id="info3"
            className="border-2 border-black/50 rounded-xl p-3 m-3 bg-gray-300/60"
          >
            <h2 className="mb-3 font-semibold">?info Title3</h2>
            <div id="tresc3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem porro
              nobis eligendi nam voluptate magni placeat delectus quo unde a
              quis ab voluptas et, aperiam, est corporis voluptates quos
              voluptatibus.
            </div>
          </div>
          <div
            id="info2"
            className="border-2 border-black/50 rounded-xl p-3 m-3 bg-gray-300/60"
          >
            <h2 className="mb-3 font-semibold">?info Title2</h2>
            <div id="tresc2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem porro
              nobis eligendi nam voluptate magni placeat delectus quo unde a
              quis ab voluptas et, aperiam, est corporis voluptates quos
              voluptatibus.
            </div>
          </div>
          <div
            id="info1"
            className="border-2 border-black/50 rounded-xl p-3 m-3 bg-gray-300/60"
          >
            <h2 className="mb-3 font-semibold">?info Title1</h2>
            <div id="tresc1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem porro
              nobis eligendi nam voluptate magni placeat delectus quo unde a
              quis ab voluptas et, aperiam, est corporis voluptates quos
              voluptatibus.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
