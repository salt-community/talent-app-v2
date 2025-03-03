import React, { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components";
import { useToast } from "@/hooks/use-toast";
import { ScoreAssignment } from "../../types";

type Props = {
  scores: ScoreAssignment[];
  onSuccess: () => void;
};

export function Scoring({ scores, onSuccess }: Props) {
  const [score, setScore] = useState<ScoreAssignment[]>(scores);

  const { toast } = useToast();

  const handleScoreChange = (id: string, value: string) => {
    setScore(
      (prev) =>
        prev?.map((score) =>
          score.assignmentId === id
            ? { ...score, score: parseInt(value) }
            : score
        ) || []
    );
  };

  const handleCommentChange = (id: string, value: string) => {
    setScore(
      (prev) =>
        prev?.map((score) =>
          score.assignmentId === id ? { ...score, comment: value } : score
        ) || []
    );
  };

  const handleSubmitScoring = async () => {
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
        {score.map((score) => (
          <div key={score.id} className="border p-4 rounded-md">
            <Label
              htmlFor={`score-${score}`}
              className="block mb-2 font-medium text-gray-800"
            >
              {score.category}
            </Label>
            <Input
              id={`score-${score.assignmentId}`}
              value={score.score || ""}
              onChange={(e) => handleScoreChange(score.id, e.target.value)}
              placeholder="Enter score"
              className="mb-3"
            />

            <Label
              htmlFor={`comment-${score}`}
              className="block mb-2 font-medium text-gray-800"
            >
              Comment for {score.category}
            </Label>
            <Textarea
              id={`comment-${score.assignmentId}`}
              value={score.comment || ""}
              onChange={(e) => handleCommentChange(score.id, e.target.value)}
              placeholder={`Enter comment for ${score}`}
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
