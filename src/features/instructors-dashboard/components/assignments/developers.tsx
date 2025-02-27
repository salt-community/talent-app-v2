"use client";
import React from "react";
import { Assignment, Developer } from "../../types";
import OpenScoreFormButton from "./open-score-form-button";
import { Check } from "lucide-react";

type Props = {
  developer: Developer;
  assignment: Assignment;
  scored: boolean;
};

export default function Developers({ developer, assignment, scored }: Props) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <div className="py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center text-white font-medium">
            {developer.name.substring(0, 2)}
          </div>
          <div>
            <div className="flex flex-row gap-2 font-medium">
              {developer.name}
              <div className="text-green-500">
                <Check size={24} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <OpenScoreFormButton
            assignment={{
              ...assignment.assignment,
              category: assignment.assignment.category ?? [],
            }}
          />
        </div>
      </div>
    </div>
  );
}
