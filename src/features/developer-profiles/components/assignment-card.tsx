"use client";

import { useState } from "react";
import { Assignment } from "../types";
import { Card } from "@/components";
type AverageScoresMap = Map<string, number>;
type Props = {
  assignment: Assignment[];
  averageScore: AverageScoresMap;
};

export function AssignmentCard({ assignment, averageScore }: Props) {
  const [expandedAssignment, setExpandedAssignment] = useState<string | null>(
    null
  );
  const toggleExpand = (id: string) => {
    setExpandedAssignment(expandedAssignment === id ? null : id);
  };
  return (
    <div className="space-y-4">
      {assignment.map((assignment) => {
        const score = averageScore.get(assignment.id) || 0;
        return (
          <Card
            key={assignment.id}
            className={`transition-all duration-300 ease-in-out overflow-hidden cursor-pointer ${
              expandedAssignment === assignment.id
                ? "shadow-md"
                : "shadow-sm hover:shadow"
            }`}
          >
            <div
              className="px-6 py-4 flex justify-between items-center"
              onClick={() => toggleExpand(assignment.id)}
            >
              <div className="flex items-center space-x-4">
                <i
                  className={`fas ${expandedAssignment === assignment.id ? "fa-chevron-down" : "fa-chevron-right"} text-gray-400`}
                ></i>
                <h3 className="font-medium text-lg text-gray-900">
                  {assignment.title}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-semibold text-blue-600">
                  {score}
                </span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
