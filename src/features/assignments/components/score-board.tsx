"use client";

import { useEffect } from "react";
import { errorHandler } from "@/lib";
import { useActionState } from "react";
import type { Assignment } from "../types";
import { fetchAssignmentsByCohortAction } from "@/features/assignments/actions";
import { Separator, H2 } from "@/components/ui";
import { AverageScore } from "./average-score";
import { SpiderGraph } from "./spider-graph";
import { Assignments } from "./accordion";

interface IScoreBoardProps {
  cohortId: string;
}

export function ScoreBoard({ cohortId }: IScoreBoardProps): JSX.Element {
  const [assignments, fetchAssignments, isPending] = useActionState(
    fetchAssignmentsByCohortAction,
    [] as Assignment[],
    `/cohorts/${cohortId}`
  );

  useEffect(() => {
    (async () => {
      try {
        await fetchAssignments({ cohortId });
      } catch (error) {
        errorHandler(error);
      }
    })();
  }, []);

  return (
    <section className="min-w-72">
      <Separator className="my-4" />
      <H2>Salt Scoring</H2>
      {isPending && <p>Loading assignments...</p>}
      {!isPending && assignments.length === 0 && (
        <p>No assignments found for this cohort.</p>
      )}
      <AverageScore assignments={assignments} />
      <SpiderGraph assignments={assignments} />
      <Assignments assignments={assignments} />
    </section>
  );
}
