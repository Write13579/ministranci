import { useEffect, useState } from "react";
import { PunktacjaData } from "./page";
import { savePunktacja } from "./actions";
import { useRouter } from "next/navigation";

export const usePunktacja = (initialData: PunktacjaData) => {
  const router = useRouter();

  const [data, setData] = useState(
    initialData.map((data) => ({ data, edited: false }))
  );

  const [isSavingData, setIsSavingData] = useState(false);

  useEffect(() => {
    setData(
      initialData.map((data) => ({
        data,
        edited: false,
      }))
    );
  }, [initialData]);

  const updateData = <V extends keyof PunktacjaData[number]>(
    id: number,
    dataKey: V,
    value: PunktacjaData[number][V]
  ) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.data.id === id
          ? {
              data: { ...row.data, [dataKey]: value },
              edited: prevData.some(
                (row) =>
                  row.data.id === id &&
                  Object.entries({ ...row.data, [dataKey]: value }).some(
                    ([key, val]) =>
                      val !==
                      initialData.find((data) => data.id === id)![
                        key as keyof PunktacjaData[number]
                      ]
                  )
              ),
            }
          : row
      )
    );
  };

  const saveData = async () => {
    setIsSavingData(true);
    await savePunktacja(data);
    setIsSavingData(false);
    router.refresh();
  };

  return { data, updateData, saveData, isSavingData };
};
