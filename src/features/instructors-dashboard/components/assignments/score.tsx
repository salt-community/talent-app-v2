"use client";

import React, { useState } from "react";
import { AssignmentScore, Developer } from "../../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateScoreAction } from "../../action";

type ScoreProps = {
  scores: AssignmentScore[];
  developer: Developer;
};

export function Score({ scores, developer }: ScoreProps) {
  const [scoreValues, setScoreValues] = useState<AssignmentScore[]>(scores);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleScoreChange = (categoryId: string, value: string) => {
    setScoreValues((prev) =>
      prev.map((s) =>
        s.categoryId === categoryId ? { ...s, score: parseInt(value) || 0 } : s
      )
    );
  };

  const handleCommentChange = (categoryId: string, value: string) => {
    setScoreValues((prev) =>
      prev.map((s) =>
        s.categoryId === categoryId ? { ...s, comment: value } : s
      )
    );
  };

  const handleSaveScores = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    const updatedScores = [...scoreValues];

    try {
      const baseScoreData = {
        assignmentId: updatedScores[0].assignmentId,
        identityId: updatedScores[0].identityId,
        score: updatedScores[0].score,
        status: updatedScores[0].status || "unpublished",
        id: updatedScores[0].id || "",
      };

      const feedbackDataArray = updatedScores.map((score) => ({
        comment: score.comment || "",
        score: score.score,
        categoryId: score.categoryId,
      }));

      const result = await updateScoreAction(baseScoreData, feedbackDataArray);

      if (result.success) {
        setSaveStatus({
          success: true,
          message: "All feedback saved successfully!",
        });
      } else {
        setSaveStatus({
          success: false,
          message: "Failed to save feedback.",
        });
      }
    } catch (error) {
      setSaveStatus({
        success: false,
        message: `An error occurred while saving feedback. ${error}`,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-3 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">Scores for {developer.name}</h3>
      </div>

      {saveStatus && (
        <div
          className={`mb-3 p-2 rounded text-xs ${
            saveStatus.success
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {saveStatus.message}
        </div>
      )}

      <div className="space-y-4">
        {scoreValues.map((score) => (
          <div key={score.categoryId}>
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-medium text-sm capitalize">
                {score.categoryName}
              </h4>
              <div className="flex items-center gap-2">
                <Label
                  htmlFor={`score-${score.categoryId}`}
                  className="text-xs text-gray-600"
                >
                  Score
                </Label>
                <Input
                  id={`score-${score.categoryId}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min="0"
                  max="100"
                  value={score.score.toString()}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (
                      value === "" ||
                      (/^\d+$/.test(value) && parseInt(value) <= 100)
                    ) {
                      handleScoreChange(score.categoryId, value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key === "ArrowUp" ||
                      e.key === "ArrowDown" ||
                      (!/^\d$/.test(e.key) &&
                        ![
                          "Backspace",
                          "Delete",
                          "Tab",
                          "ArrowLeft",
                          "ArrowRight",
                          "Home",
                          "End",
                        ].includes(e.key) &&
                        !e.ctrlKey &&
                        !e.metaKey)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  className="w-14 h-7 text-center"
                />
              </div>
            </div>

            <Textarea
              id={`comment-${score.categoryId}`}
              value={score.comment || ""}
              onChange={(e) =>
                handleCommentChange(score.categoryId, e.target.value)
              }
              placeholder={`Add comments for ${score.categoryName}...`}
              className="w-full text-sm mb-1"
              rows={1}
            />
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <Button onClick={handleSaveScores} disabled={isSaving} size="sm">
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
