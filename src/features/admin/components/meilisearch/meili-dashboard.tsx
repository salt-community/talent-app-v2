import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Separator,
  H1,
} from "@/components";
import { MeiliSettings } from "./meili-configuration";
import { MeiliPopulation } from "./meili-population";
import Link from "next/link";

export function MeiliDashboard() {
  return (
    <div className="container mx-auto flex flex-col justify-center px-4 pt-2 gap-4">
      <div className="flex justify-between">
        <H1>Admin</H1>
        <div className="flex py-1 px-1 bg-gray-200 rounded-md">
          <Link
            href={"/admin/developers"}
            className="py-1 px-4 rounded-md text-paragraphLight"
          >
            Developers
          </Link>
          <Link
            href={"/admin/identities"}
            className="py-1 px-4 rounded-md text-paragraphLight"
          >
            Identities
          </Link>
          <Link
            href={"/admin/meilisearch-configuration"}
            className="py-1 px-4 rounded-md  bg-black text-white"
          >
            Search Configuration
          </Link>
        </div>
      </div>
      <Card className="container mx-auto h-full p-2">
        <CardContent className="flex flex-col gap-8">
          <MeiliPopulation />
          <Separator />
          <MeiliSettings />
        </CardContent>
      </Card>
    </div>
  );
}
