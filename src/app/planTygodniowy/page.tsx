"use server";

import { db } from "@/lib/database";
import TabelaTydzien from "./tabelaTydzien";
import { getMe } from "../authutils";
import {
  DzienTygodnia,
  GodzinaTygodniowa,
  planTygodniowy,
  User,
} from "@/lib/database/scheme";

async function getPlanTygodniowyWithUsers() {
  const planTygodniowyWithUsers = await db.query.planTygodniowy.findMany({
    with: { user: true },
  });

  type PlanRow = {
    godzina: GodzinaTygodniowa;
  } & {
    [dzien in DzienTygodnia]: User[];
  };

  const wpisy = Object.values(GodzinaTygodniowa).map((godzina) => {
    const row = {
      godzina,
      ...Object.fromEntries(
        Object.values(DzienTygodnia).map((dzien) => [dzien, []])
      ),
    } as PlanRow;

    planTygodniowyWithUsers
      .filter((plan) => plan.GodzinaTygodniowa === godzina)
      .forEach((plan) => row[plan.DzienTygodnia].push(plan.user));

    return row;
  });

  return { planTygodniowyWithUsers, wpisy };
}

export type PlanTygodniowyWithUsers = Awaited<
  ReturnType<typeof getPlanTygodniowyWithUsers>
>["wpisy"];

export type PlanTygodniowyWithUsersNotSorted = Awaited<
  ReturnType<typeof getPlanTygodniowyWithUsers>
>["planTygodniowyWithUsers"];

export default async function planTygodniowyPage() {
  const plany = await getPlanTygodniowyWithUsers();
  const user = await getMe();

  return (
    <TabelaTydzien
      plany={plany.wpisy}
      planyNotSorted={plany.planTygodniowyWithUsers}
    />
  );
}
