import { AddInputOdznaki } from "./odznaka";

export default function pageOdznaki() {
  return (
    <div id="alles">
      <h1 className="flex justify-center items-center text-3xl mb-10 font-bold italic">
        PRZYZNAJ ODZNAKĘ
      </h1>
      <AddInputOdznaki />
    </div>
  );
}
