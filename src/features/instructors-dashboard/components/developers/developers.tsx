import { AddDeveloperButton } from "./open-developer-form-button";
import { instructorService } from "../../instance";
import { Separator } from "@/components";
import dynamic from "next/dynamic";

type Props = {
  name: string;
};

const DeveloperCard = dynamic(() => import("./developer-card"), {
  ssr: true,
});

export async function Developers({ name }: Props) {
  const cohortData =
    await instructorService.getCohortDevelopersDataByName(name);

  if (!cohortData) return <div>No data found</div>;

  const { cohort, developers, unsignedDevelopers } = cohortData;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center py-2">
        <h2 className="text-2xl font-semibold">Developers</h2>
        <AddDeveloperButton
          developer={unsignedDevelopers}
          cohortId={cohort.id}
        />
      </div>
      <Separator />
      <DeveloperCard developer={developers} />
    </div>
  );
}
