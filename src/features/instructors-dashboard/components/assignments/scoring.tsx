import React, { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components";
import { Assignment } from "../../types";
import { addScoreToAssignment } from "../../action";
import { useToast } from "@/hooks/use-toast";

type Props = {
  assignment: Assignment;
  onSuccess: () => void;
};

export function Scoring({ assignment, onSuccess }: Props) {
  const [scores, setScores] = useState<Record<string, string>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleScoreChange = (category: string, value: string) => {
    setScores((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleCommentChange = (category: string, value: string) => {
    setComments((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSubmitScoring = async () => {
    const categoryPromises = (assignment.assignment.category || []).map(
      async (category) => {
        if (!scores[category]) return;

        await addScoreToAssignment({
          assignment: {
            assignmentId: assignment.assignment.assignmentId,
            identityId: assignment.assignment.identityId,
            title: assignment.assignment.title,
            category: category,
            comment: comments[category] || "",
            score: parseInt(scores[category], 10) || 0,
          },
        });
      }
    );

    await Promise.all(categoryPromises.filter(Boolean));

    onSuccess();
    toast({
      title: "Scoring added",
      description: "Score has been added to the assignment.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{assignment.assignment.title}</h2>
        <p className="text-gray-500 mt-1">Score each category</p>
      </div>
      <div className="space-y-6">
        {(assignment.assignment.category ?? []).map((category) => (
          <div key={category} className="border p-4 rounded-md">
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
              className="mb-3"
            />

            <Label
              htmlFor={`comment-${category}`}
              className="block mb-2 font-medium text-gray-800"
            >
              Comment for {category}
            </Label>
            <Textarea
              id={`comment-${category}`}
              value={comments[category] || ""}
              onChange={(e) => handleCommentChange(category, e.target.value)}
              placeholder={`Enter comment for ${category}`}
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
