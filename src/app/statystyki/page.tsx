import { getMe } from "../authutils";
import Statystyki from "./statystyki";

export default async function PageStatystyki() {
  const user = await getMe();
  return <Statystyki user={user} />;
}
