import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Cohort } from "../../types";
import { DeleteCohortButton } from "./delete-cohort-button";

type Props = {
  cohorts: Cohort[];
};

export function CohortCard({ cohorts }: Props) {
  return (
    <div className="w-11/12 md:w-5/6 lg:w-4/6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cohorts.map((cohort: Cohort) => (
          <div key={cohort.id} className="relative group">
            <Link
              href={`/instructor-dashboard/cohorts/${cohort.name}`}
              className="block w-full"
            >
              <Card className="w-full cursor-pointer hover:shadow-lg transition-shadow rounded bg-zinc-50">
                <CardHeader className="px-4 pt-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="scroll-m-20 text-1xl font-semibold tracking-tight">
                        {cohort.name.toUpperCase()}
                      </CardTitle>
                      <CardTitle className="text-sm text-muted-foreground">
                        {cohort.description}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <DeleteCohortButton cohortId={cohort.id!} name={cohort.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
