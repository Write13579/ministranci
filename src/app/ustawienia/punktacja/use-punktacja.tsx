import { useState } from "react";
import { PunktacjaData } from "./page";
import { savePunktacja } from "./actions";

export const usePunktacja = (initialData: PunktacjaData) => {
  const [data, setData] = useState(
    initialData.map((data) => ({ data, edited: false }))
  );

  const updateData = <V extends keyof PunktacjaData[number]>(
    id: number,
    dataKey: V,
    value: PunktacjaData[number][V]
  ) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.data.id === id
          ? { data: { ...row.data, [dataKey]: value }, edited: true }
          : row
      )
    );
  };

  const saveData = async () => {
    await savePunktacja(data);
  };

  return { data, updateData, saveData };
};
