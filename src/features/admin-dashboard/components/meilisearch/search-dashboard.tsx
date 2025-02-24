import { Separator } from "@/components";
import { MeiliPopulation } from "./search-population";
export async function MeiliDashboard() {


  return (
    <div>
      
        <section className="container mx-auto h-full p-2">
          <div className="flex flex-col gap-8">
            <MeiliPopulation />
            <Separator />

          </div>
        </section>
 
    </div>
  );
}
