import { Separator } from "@/components";
import { SearchSettings } from "./search-configuration";
import { MeiliPopulation } from "./search-population";
import { adminService } from "../../instance";

export async function MeiliDashboard() {
  const isHealthy = await adminService.isSearchHealthOk();

  return (
    <div>
      {isHealthy ? (
        <section className="container mx-auto h-full p-2">
          <div className="flex flex-col gap-8">
            <MeiliPopulation />
            <Separator />
            <SearchSettings />
          </div>
        </section>
      ) : (
        <div>Search is not healthy</div>
      )}
    </div>
  );
}
