import React, { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components";
import { useToast } from "@/hooks/use-toast";
import { ScoreAssignment } from "../../types";
import { addScoreToAssignment } from "../../action";

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
        prev?.map((s) =>
          s.id === id ? { ...s, score: parseInt(value) || 0 } : s
        ) || []
    );
  };

  const handleCommentChange = (id: string, value: string) => {
    setScore(
      (prev) =>
        prev?.map((s) => (s.id === id ? { ...s, comment: value } : s)) || []
    );
  };

  const handleSubmitScoring = async () => {
    const assignment = score.filter(
      (s) => s.score && s.comment && s.assignmentId && s.identityId
    );

    assignment.forEach((s) => {
      addScoreToAssignment({
        assignment: {
          assignmentId: s.assignmentId!,
          identityId: s.identityId!,
          category: s.category!,
          comment: s.comment,
          score: s.score!,
        },
      });
    });
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
        {score.map((s) => (
          <div key={s.id} className="border p-4 rounded-md">
            <Label
              htmlFor={`score-${s.id}`}
              className="block mb-2 font-medium text-gray-800"
            >
              {s.category}
            </Label>
            <Input
              id={`score-${s.id}`}
              value={s.score?.toString() || ""}
              onChange={(e) => handleScoreChange(s.id, e.target.value)}
              placeholder="Enter score"
              className="mb-3"
              type="number"
            />
            <Label
              htmlFor={`comment-${s.id}`}
              className="block mb-2 font-medium text-gray-800"
            >
              Comment for {s.category}
            </Label>
            <Textarea
              id={`comment-${s.id}`}
              value={s.comment || ""}
              onChange={(e) => handleCommentChange(s.id, e.target.value)}
              placeholder={`Enter comment for ${s.category}`}
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
