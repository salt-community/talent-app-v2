"use client";
import { Card } from "@/components";
import { BellRing, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Assignment } from "../types";
import AssignmentTabs from "./assignment-tabs";
import CategoryFeedback from "./category-feedback";
import { FixList } from "./fix-list";
import { ScoreDetails } from "./score-details";

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
            (item) => item.assignmentScoreId === assignment.assignmentScoreId
          ) || [];
        const fixCount = fixItems.filter(
          (item) => item.isCompleted === false
        ).length;

        return (
          <Card key={assignment.id} className="cursor-pointer">
            <div
              className="px-2 py-2 flex justify-between items-center"
              onClick={() => toggleExpand(assignment.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 flex items-center justify-center m-0">
                  <ChevronRight
                    className={`text-gray-400 transition-transform duration-300 ease-in-out  ${
                      expandedAssignment === assignment.id
                        ? "rotate-90"
                        : "rotate-0"
                    }`}
                    size={18}
                  />
                </div>
                <h3 className="font-medium text-md text-gray-900 ">
                  {assignment.title}
                </h3>
                {fixCount > 0 && (
                  <div className="motion-preset-oscillate color-red">
                    <BellRing size={18} color="red" />
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2  ">
                <span className="text-gray-500 text-sm">Average Score:</span>
                <span className="text-xl font-semibold text-blue-600 mr-2 ">
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
  );
}
