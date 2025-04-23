"use client";
import { useState } from "react";
import { Assignment } from "../types";
import { Card } from "@/components";
import { ChevronRight } from "lucide-react";
import { ScoreDetails } from "./score-details";
import CategoryFeedback from "./category-feedback";
import AssignmentTabs from "./assignment-tabs";
import { FixList } from "./fix-list";
import { fixList } from "@/features/assignments/schema";

type AverageScoresMap = Map<string, number>;

type Props = {
  assignment: Assignment[];
  averageScores: AverageScoresMap;
};

export function AssignmentCard({ assignment, averageScores }: Props) {
  const [expandedAssignment, setExpandedAssignment] = useState<string | null>(
    null
  );

  const toggleExpand = (id: string) => {
    setExpandedAssignment(expandedAssignment === id ? null : id);
    if (expandedAssignment !== id) {
      setTimeout(() => {
        assignment.find((a) => a.id === id);
      }, 100);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assignments</h1>
          <p className="text-gray-600">
            Here you can view the results for all of your assignments
          </p>
        </header>
        <div className="space-y-4">
          {assignment.map((assignment) => {
            const averageScore = averageScores.get(assignment.id) || 0;
            const feedback = assignment.feedback.map((feedback) => ({
              category: feedback.categoryName || "Unknown",
              score: feedback.score || 0,
              comment: feedback.comment || "",
              maxScore: 100,
            }));
            const fixItems =
              assignment.fixList?.filter(
                (item) =>
                  item.assignmentScoreId === assignment.assignmentScoreId
              ) || [];
            const fixCount = fixItems.filter(
              (item: fixList) => item.isCompleted === false
            ).length;

            return (
              <Card key={assignment.id} className="cursor-pointer">
                <div
                  className="px-6 py-4 flex justify-between items-center"
                  onClick={() => toggleExpand(assignment.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <ChevronRight
                        className={`text-gray-400 transition-transform duration-300 ease-in-out ${
                          expandedAssignment === assignment.id
                            ? "rotate-90"
                            : "rotate-0"
                        }`}
                        size={18}
                      />
                    </div>
                    <h3 className="font-medium text-lg text-gray-900">
                      {assignment.title}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">Average Score:</span>
                    <span className="text-xl font-semibold text-blue-600">
                      {averageScore}
                    </span>
                  </div>
                </div>

                {expandedAssignment === assignment.id && (
                  <div className="border-t border-gray-200 px-6 py-4">
                    <AssignmentTabs
                      feedbackContent={
                        <>
                          <ScoreDetails scoreItems={feedback} />
                          <CategoryFeedback feedbacks={feedback} />
                        </>
                      }
                      fixListContent={<FixList items={fixItems} />}
                      fixCount={fixCount}
                    />
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
