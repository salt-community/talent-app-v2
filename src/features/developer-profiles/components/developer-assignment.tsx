"use server";
import React from "react";
import { developerProfilesService } from "../instance";
import { Assignment_Feedback, Category } from "../types";

export async function DeveloperAssignment({ slug }: { slug: string }) {
  const currentUser = await developerProfilesService.getCurrentUsers();
  const identityId = currentUser?.id;

  if (!identityId) {
    return (
      <div className="p-6 text-center">
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-yellow-800">Not logged in</h3>
          <p className="mt-2 text-yellow-700">
            You must be logged in to view your assignments.
          </p>
        </div>
      </div>
    );
  }

  const assignments =
    await developerProfilesService.getScoredAssignmentsByIdentityId(identityId);
  const assignment = assignments.find((assignment) => assignment.slug === slug);


  if (!assignment) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-red-800">
            Assignment not found
          </h3>
          <p className="mt-2 text-red-700">
            The requested assignment &quot;{slug}&quot; could not be found.
          </p>
        </div>
      </div>
    );
  }

  const scores = Array.isArray(assignment.feedback) ? assignment.feedback : [];


  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{assignment.title}</h2>
        <p className="text-gray-600">{assignment.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {scores.map((score: Assignment_Feedback, index: number) => {
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-medium text-gray-800 capitalize">
                  {score.categoryName}
                </h3>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Score</span>
                  <div className="flex items-center">
                    <span className="text-xl font-bold">
                      {score.score || "N/A"}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 mb-2">Feedback</h4>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    {score.comment || (
                      <p className="text-gray-400 italic">
                        No comment provided
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {assignment.categories && assignment.categories.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="font-medium text-gray-800">Categories</h3>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {assignment.categories.map(
                (category: Category, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {category.name}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
