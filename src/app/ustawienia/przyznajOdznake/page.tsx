import { db } from "@/lib/database";
import { AddOdznaka } from "./odznaka";

export default async function pageOdznaki() {
  const ministranci = await db.query.users.findMany();

  return (
    <div id="alles">
      <h1 className="flex justify-center items-center text-3xl mb-10 font-bold italic">
        PRZYZNAJ ODZNAKĘ
      </h1>
      <AddOdznaka ministranci={ministranci} />
    </div>
  );
}
