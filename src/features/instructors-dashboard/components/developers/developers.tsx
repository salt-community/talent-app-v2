import React from "react";
import StudentCard from "./developer-card";
import AddDeveloperButton from "./open-developer-form-button";
import { instructorService } from "../../instance";
import { notFound } from "next/navigation";
import { ScrollArea, Separator } from "@/components";

type Props = {
  name: string;
};

export async function Developers({ name }: Props) {
  const cohortData =
    await instructorService.getCohortDevelopersDataByName(name);

  if (!cohortData) notFound();

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

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <StudentCard developer={developers} />
      </ScrollArea>
    </div>
  );
}
