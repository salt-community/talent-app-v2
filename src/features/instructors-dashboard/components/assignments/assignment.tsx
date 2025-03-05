import React from "react";
import { instructorService } from "../../instance";
import Developer from "./developers";
import { SubmitScoresButton } from "./submit-scores-button";

export async function AssignmentComponent({ slug }: { slug: string }) {
  const data = await instructorService.getAssigmentDataBySlug(slug);
  if (!data) return null;

  const { assignment, developersWithScores } = data;

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4">{assignment.title}</h1>
      <hr className="mb-6" />
      <h2 className="text-2xl font-bold mb-4">Assignment Details</h2>
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
          <div className="flex items-center justify-start gap-2">
            <span className="text-3xl font-bold">
              {developersWithScores.length}
            </span>
            <span className="text-gray-600">Students</span>
          </div>
          <div>
            <SubmitScoresButton
              assignmentId={assignment.id}
              status={"published"}
            />
          </div>
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 py-3 px-4 border-b border-gray-200">
          <h3 className="font-medium">Total students</h3>
        </div>
        <div>
          {developersWithScores.map(
            ({ developer, scores, scored, published }) => (
              <Developer
                key={developer.id}
                developer={developer}
                scores={scores}
                scored={scored}
                published={published}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
