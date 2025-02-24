import { Separator } from "@/components";
import Form from "next/form";
import { MeiliPopulation } from "./search-population";
import { LoadingButton } from "./loading-button";
import { ensureSearchIndexesAction } from "../../action";
export async function MeiliDashboard() {
  return (
    <div>
      <section className="container mx-auto h-full p-2">
        <div className="flex flex-col gap-8">
          <MeiliPopulation />
          <Separator />
          <Form action={ensureSearchIndexesAction}>
            <LoadingButton
              text="Ensure Indexes"
              loadingText="Ensuring Indexes..."
            />
          </Form>
        </div>
      </section>
    </div>
  );
}
