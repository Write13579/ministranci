"use server";

import SelectUser from "./SelectUser";
import { allUsersNames } from "./user-actions";

export default async function ustawKomusNoweHaslo() {
  const users = await allUsersNames();

  return (
    <div id="alles">
      <h1 className="flex justify-center items-center text-3xl text-center mb-1 font-bold italic round">
        RESETUJ MINISTRANTOWI HASŁO
      </h1>
      <div
        id="kwadrat"
        className="border-2 border-black/30 rounded-lg py-2.5 px-3 font-semibold bg-gray-300 m-7"
      >
        <div id="selectUser" className="flex justify-center mt-3 mb-3">
          <SelectUser users={users} />
        </div>
      </div>
    </div>
  );
}
