"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Add this import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cohort } from "@/features";

type Props = {
  cohorts: Cohort[];
};

export function CohortCard({ cohorts }: Props) {
  const router = useRouter();

  return (
    <div className="w-11/12 md:w-5/6 lg:w-4/6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cohorts.map((cohort: Cohort) => (
          <Card
            key={cohort.id}
            className="w-full cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() =>
              router.push(`/instructor-dashboard/cohorts/${cohort.id}`)
            }
          >
            <CardHeader className="p-4">
              <CardTitle className="scroll-m-20 text-1xl font-semibold tracking-tight">
                {cohort.name.toUpperCase()}
              </CardTitle>
              <CardTitle className="text-sm text-muted-foreground">
                {cohort.description}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-4">
              <div className="flex justify-between border-b pb-4">
                <p className="text-sm text-muted-foreground">{cohort.status}</p>
              </div>
              <div className="flex justify-start"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
