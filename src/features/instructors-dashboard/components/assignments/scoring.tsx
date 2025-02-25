import React, { useState } from "react";
import { Button, Input, Label } from "@/components";

type Props = {
  assignment: {
    id: string;
    title: string;
    category: string[] | null;
  };
};

export function Scoring({ assignment }: Props) {
  const [scores, setScores] = useState<Record<string, string>>({});

  const handleScoreChange = (category: string, value: string) => {
    setScores((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSubmitScoring = () => {
    console.log("Submitting scores:", scores);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{assignment.title}</h2>
        <p className="text-gray-500 mt-1">Score each category</p>
      </div>

      <div className="space-y-6">
        {(assignment.category ?? []).map((category) => (
          <div key={category}>
            <Label
              htmlFor={`score-${category}`}
              className="block mb-2 font-medium text-gray-800"
            >
              {category}
            </Label>
            <Input
              id={`score-${category}`}
              value={scores[category] || ""}
              onChange={(e) => handleScoreChange(category, e.target.value)}
              placeholder="Enter score"
            />
          </div>
        ))}
      </div>

      <div className="pt-4 border-t flex justify-end">
        <Button onClick={handleSubmitScoring}>Save</Button>
      </div>
    </div>
  );
}
