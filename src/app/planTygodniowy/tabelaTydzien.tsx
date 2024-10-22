// "use client";

// import {
//   PlanNiedzielny,
//   planTygodniowy,
//   GodzinaTygodniowa,
//   DzienTygodnia,
// } from "@/lib/database/scheme";
// import { useState } from "react";
// import { UserWithTydzien } from "./page";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/lib/auth";
// import clsx from "clsx";
// import { zapiszNaGodzine, wypiszZGodziny } from "./actionsTydzien";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { House } from "lucide-react";
// import Link from "next/link";

// function naGodzine(
//   planUsera: planTygodniowy,
//   godzina: GodzinaTygodniowa,
//   dzien: DzienTygodnia
// ) {
//   switch (godzina) {
//     case GodzinaTygodniowa.OSIEMNASTA:
//       return planUsera.GodzinaTygodniowa;
//     case GodzinaTygodniowa.OSMA:
//       return planUsera.GodzinaTygodniowa;
//     default:
//       return false;
//   }
// }

// function ZapiszSieButton({
//   godzina,
//   dzien,
//   onSave,
// }: {
//   godzina: GodzinaTygodniowa;
//   dzien: DzienTygodnia;
//   onSave?: () => void;
// }) {
//   const [saving, setSaving] = useState(false);

//   async function save() {
//     setSaving(true);
//     await zapiszNaGodzine(godzina, dzien);
//     setSaving(false);
//     onSave?.();
//   }

//   return (
//     <Button
//       onClick={save}
//       loading={saving}
//       className="w-full mt-2.5 bg-green-600 hover:bg-green-500"
//     >
//       Zapisz się
//     </Button>
//   );
// }

// function WypiszSieButton({
//   godzina,
//   onUnsave,
// }: {
//   godzina: GodzinaTygodniowa;
//   onUnsave?: () => void;
// }) {
//   const [unsaving, setUnsaving] = useState(false);

//   async function unsave() {
//     setUnsaving(true);
//     await wypiszZGodziny(godzina);
//     setUnsaving(false);
//     onUnsave?.();
//   }

//   return (
//     <Button
//       onClick={unsave}
//       loading={unsaving}
//       className="w-full mt-2.5 bg-red-600 hover:bg-red-500"
//     >
//       Wypisz się
//     </Button>
//   );
// }

// export default function TabelaNiedziela({
//   users,
//   userPlan,
// }: {
//   users: UserWithTydzien;
//   userPlan: planTygodniowy;
// }) {
//   const me = useAuth();
//   const router = useRouter();

//   const [editing, setEditing] = useState(false);

//   return (
//     <div id="wraper" className="relative">
//       <Link href="/" className="mx-5 flex absolute top-1">
//         <House />
//       </Link>
//       <div>
//         <h1 className="flex justify-center items-center text-3xl mb-10 font-bold italic">
//           PLAN NIEDZIELNY
//         </h1>
//         <div id="buttonZmianyGodziny" className="mb-9 flex justify-center">
//           {!editing ? (
//             <Button onClick={() => setEditing(true)}>
//               Zmień swoją godzinę
//             </Button>
//           ) : (
//             <Button onClick={() => setEditing(false)}>Anuluj</Button>
//           )}
//         </div>
//         <div id="calaTabela" className="mx-4 border-4 border-black rounded-md">
//           {Object.values(GodzinaTygodniowa).map((godzina) => (
//             <div
//               id="wiersze"
//               className="grid grid-cols-3 border border-black"
//               key={godzina}
//             >
//               <div
//                 id="godziny"
//                 className="mx-2 my-5 flex justify-center items-center"
//               >
//                 {godzina}
//               </div>
//               {!editing ? (
//                 <div
//                   id="usernames"
//                   className="col-span-2 border-2 border-l-black grid items-center justify-center gap-1 py-2 text-center"
//                 >
//                   {/* {users
//                     .filter((user) => {
//                       if (!user.planNiedzielny) return false;
//                       return naGodzine(user.planNiedzielny, godzina);
//                     })
//                     .map((userForGodzina) => (
//                       <span
//                         key={userForGodzina.id}
//                         className={clsx(
//                           me!.id === userForGodzina.id && "font-bold"
//                         )}
//                       >
//                         {userForGodzina.name}
//                       </span>
//                     ))} */}
//                 </div>
//               ) : (
//                 <div
//                   id="miniAlles"
//                   className="col-span-2 border-2 border-l-black"
//                 >
//                   {naGodzine(userPlan, godzina, dzien) ? (
//                     <div className="px-2">
//                       <WypiszSieButton
//                         onUnsave={() => {
//                           router.refresh();
//                           setEditing(false);
//                           toast(`Wypisałeś się z godziny: ${godzina}!`);
//                         }}
//                         godzina={godzina}
//                       />
//                     </div>
//                   ) : (
//                     <div className="px-2">
//                       <ZapiszSieButton
//                         onSave={() => {
//                           router.refresh();
//                           setEditing(false);
//                           toast(`Zapisałeś się na godzinę: ${godzina}!`);
//                         }}
//                         godzina={godzina}
//                         dzien={dzien}
//                       />
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
