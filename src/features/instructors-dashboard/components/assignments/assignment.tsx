import React from "react";
import { instructorService } from "../../instance";
import Developer from "./developers";
import { SubmitScoresButton } from "./submit-scores-button";

export async function AssignmentComponent({ slug }: { slug: string }) {
  const assignment = await instructorService.getAssignmentBySlug(slug);
  if (!assignment) return null;
  const developers = await instructorService.getCohortStudentsByCohortId(
    assignment.cohortId
  );
  if (!developers) return null;
  return (
    <div className="max-w-6xl mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4">{assignment.title}</h1>
      <hr className="mb-6" />
      <h2 className="text-2xl font-bold mb-4">Assignment Details</h2>
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
          <div className="flex items-center justify-start gap-2">
            <span className="text-3xl font-bold">{developers.length}</span>
            <span className="text-gray-600">Students</span>
          </div>
          <div>
            <SubmitScoresButton />
          </div>
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 py-3 px-4 border-b border-gray-200">
          <h3 className="font-medium">Total students</h3>
        </div>
        <div>
          {developers.map((developer) => (
            <Developer
              key={developer.id}
              developer={developer}
              assignment={{
                id: assignment.id,
                title: assignment.title,
                category: assignment.categories,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
