"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cohort } from "@/features";
import Link from "next/link";

type Props = {
  cohorts: Cohort[];
};
export function CohortCard({ cohorts }: Props) {
  return (
    <div className="w-11/12 md:w-5/6 lg:w-4/6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cohorts.map((cohort: Cohort) => (
          <Link
            href={`/instructor-dashboard/cohorts/${cohort.name}`}
            className="w-full"
            key={cohort.id}
          >
            <Card
              key={cohort.id}
              className="w-full cursor-pointer hover:shadow-lg transition-shadow rounded bg-slate-50"
            >
              <CardHeader className="px-4 pt-4 pb-2">
                <CardTitle className="scroll-m-20 text-1xl font-semibold tracking-tight">
                  {cohort.name.toUpperCase()}
                </CardTitle>
                <CardTitle className="text-sm text-muted-foreground">
                  {cohort.description}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-4">
                <div className="flex justify-between pb-3">
                  <p className="text-sm text-muted-foreground">
                    {cohort.status}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
