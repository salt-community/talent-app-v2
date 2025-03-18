import React, { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components";
import { useToast } from "@/hooks/use-toast";

import { addScoreToAssignment } from "../../action";
import { AssignmentScore } from "@/features/assignments";
import { on } from "node:events";

type Props = {
  assignmentScores: AssignmentScore[];
  onSuccess: () => void;
  onLoading?: (isLoading: boolean) => void;
};

export function Scoring({ assignmentScores, onSuccess, onLoading }: Props) {
  const [scores, setScores] = useState<AssignmentScore[]>(assignmentScores);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleScoreChange = (category: string, value: string) => {
    setScores((prev) =>
      prev.map((s) =>
        s.category === category ? { ...s, score: parseInt(value) } : s
      )
    );
  };

  const handleCommentChange = (category: string, value: string) => {
    setScores((prev) =>
      prev.map((s) => (s.category === category ? { ...s, comment: value } : s))
    );
  };

  const handleSubmitScoring = async () => {
    setIsSubmitting(true);

    onLoading?.(true);

    const results = await Promise.all(
      scores.map((s) => addScoreToAssignment(s))
    );

    const anyFailed = results.some((result) => !result.success);

    if (anyFailed) {
      toast({
        title: "Error",
        description: "Failed to save some or all scores.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Scoring added",
        description: "Score has been added to the assignment.",
      });
      onSuccess();
    }

    setIsSubmitting(false);

    onLoading?.(false);
  };
  return (
    <div className="p-6 flex flex-col gap-y-6">
      <div>
        <h2 className="text-2xl font-bold">{"assignment"}</h2>
        <p className="text-gray-500 mt-1">Score each category</p>
      </div>

      <div className="space-y-4 flex-1 overflow-visible">
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
      <div className="pt-4 flex justify-end sticky bottom-0 bg-white">
        <Button onClick={handleSubmitScoring} disabled={isSubmitting}>
          {" "}
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
