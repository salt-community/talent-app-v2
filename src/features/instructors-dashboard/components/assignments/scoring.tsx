import React, { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components";
import { useToast } from "@/hooks/use-toast";

import { addScoreToAssignment } from "../../action";
import { AssignmentScore } from "@/features/assignments";

type Props = {
  assignmentScores: AssignmentScore[];
  onSuccess: () => void;
};

export function Scoring({ assignmentScores, onSuccess }: Props) {
  const [scores, setScores] = useState<AssignmentScore[]>(assignmentScores);
  const { toast } = useToast();

  const handleScoreChange = (category: string, value: string) => {
    setScores((prev) =>
      prev.map((s) =>
        s.category === category ? { ...s, score: parseInt(value) } : s,
      ),
    );
  };

  const handleCommentChange = (category: string, value: string) => {
    setScores((prev) =>
      prev.map((s) => (s.category === category ? { ...s, comment: value } : s)),
    );
  };

  const handleSubmitScoring = async () => {
    await Promise.all(
      scores.map(async (s) => {
        await addScoreToAssignment(s);
      }),
    );

    onSuccess();
    toast({
      title: "Scoring added",
      description: "Score has been added to the assignment.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{"assignment"}</h2>
        <p className="text-gray-500 mt-1">Score each category</p>
      </div>
      <div className="space-y-6">
        {scores.map((score) => (
          <div key={score.category} className="border p-4 rounded-md">
            <Label
              htmlFor={`score-${score.category}`}
              className="block mb-2 font-medium text-gray-800"
            >
              {score.category}
            </Label>
            <Input
              id={`score-${score.id}`}
              value={score.score?.toString() || ""}
              onChange={(e) =>
                handleScoreChange(score.category!, e.target.value)
              }
              placeholder="Enter score"
              className="mb-3"
              type="number"
            />
            <Label
              htmlFor={`comment-${score.category}`}
              className="block mb-2 font-medium text-gray-800"
            >
              Comment for {score.category}
            </Label>
            <Textarea
              id={`comment-${score.category}`}
              value={score.comment || ""}
              onChange={(e) =>
                handleCommentChange(score.category!, e.target.value)
              }
              placeholder={`Enter comment for ${score.category}`}
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
