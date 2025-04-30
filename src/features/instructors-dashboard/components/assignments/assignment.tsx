import React from "react";
import { instructorService } from "../../instance";
import { SubmitScoresButton } from "./submit-scores-button";
import dynamic from "next/dynamic";

const AssignmentTable = dynamic(
  () =>
    import("./assignment-table").then((mod) => ({
      default: mod.AssignmentTable,
    })),
  {
    loading: () => (
      <div className="assignment-skeleton p-4">Loading assignment data...</div>
    ),
  }
);

export async function AssignmentComponent({ slug }: { slug: string }) {
  const data = await instructorService.getAssignmentDataBySlug(slug);
  if (!data) return null;
  const { assignment, developersWithScores, fixLists, privateNotes } = data;

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4">{assignment.title}</h1>
      <hr className="mb-6" />
      <h2 className="text-2xl font-bold mb-4">Assignment Details</h2>
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="md:flex border border-gray-200 rounded-lg p-4 justify-between items-center">
          <div className="flex items-center justify-start gap-2">
            <span className="text-3xl font-bold">
              {developersWithScores.length}
            </span>
            <span className="text-gray-600">Students</span>
          </div>
          <SubmitScoresButton
            scoreStatuses={developersWithScores.map((d) => ({
              assignmentId: assignment.id,
              identityId: d.developer.id,
              status: "published",
            }))}
          />
        </div>
      </div>

      <AssignmentTable
        developersWithScores={developersWithScores}
        assignmentTitle={assignment.title}
        fixLists={fixLists}
        privateNotes={privateNotes}
      />
    </div>
  );
}
