import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Separator,
} from "@/components";
import { MeiliSettings } from "./meili-configuration";
import { MeiliPopulation } from "./meili-population";

export function MeiliDashboard() {
  return (
    <Card className="container mx-auto h-full p-2">
      <CardHeader>
        <CardTitle>Meilisearch</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <MeiliPopulation />
        <Separator />
        <MeiliSettings />
      </CardContent>
    </Card>
  );
}
