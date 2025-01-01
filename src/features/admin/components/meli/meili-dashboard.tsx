import { Card, CardHeader, CardTitle, CardContent } from "@/components";
import { Form } from "react-hook-form";
import { repopulateMeilisearchAction } from "../../action";
import { LoadingButton } from "./loading-button";
import { MeiliConfiguration } from "./meili-configuration";
import { MeiliPopulation } from "./meili-population";

export function MeiliDashboard() {
  return (
    <Card className="container mx-auto h-full p-2">
      <CardHeader>
        <CardTitle>Meilisearch</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <MeiliPopulation />
      </CardContent>
    </Card>
  );
}
