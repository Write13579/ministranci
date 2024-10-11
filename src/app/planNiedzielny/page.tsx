import { db } from "@/lib/database";
import { PlanNiedzielny } from "@/lib/database/scheme";
import { columns, DataTable } from "./data-tableNiedziela";

  async function getData(): Promise<PlanNiedzielny[]> {
    const users = await db.query.users.findMany({
      with: { planNiedzielny: true },
    });
    const allPlanNiedzielny = await db.query.planNiedzielny.findMany({
      with: { user: true },
    });

    return allPlanNiedzielny;
  }

  export default async function planNiedzielny() {
    const data = await getData();
    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    )}
