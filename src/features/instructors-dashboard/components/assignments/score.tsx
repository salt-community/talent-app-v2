"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AssignmentScore, Developer } from "../../types";
import useAutoSaveScores from "./use-auto-save";

type ScoreProps = {
  scores: AssignmentScore[];
  developer: Developer;
};

export function Score({ scores, developer }: ScoreProps) {
  const {
    scoreValues,
    handleScoreChange,
    handleCommentChange,
    saveScores,
    isSaving,
    saveStatus,
    hasUnsavedChanges,
    isManualSave
  } = useAutoSaveScores(scores);

  return (
    <div className="p-3 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">Scores for {developer.name}</h3>

      </div>

      {saveStatus && saveStatus.success && isManualSave && (
        <div className="mb-3 p-2 rounded text-xs bg-green-100 text-green-800">
          {saveStatus.message}
        </div>
      )}

      {saveStatus && !saveStatus.success && (
        <div className="mb-3 p-2 rounded text-xs bg-red-100 text-red-800">
          {saveStatus.message}
        </div>
      )}

      <div className="space-y-4">
        {scoreValues.map((score: AssignmentScore) => (
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
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-row">
            {hasUnsavedChanges && !isSaving && (
              <span className="text-xs text-amber-600 flex items-center">
                Unsaved changes
              </span>
            )}
            {isSaving && (
              <span className="text-xs text-blue-600 flex items-center">
                Saving...
              </span>
            )}
          </div>
          <Button
            onClick={saveScores}
            disabled={isSaving && isManualSave}
            size="sm"
            className="cursor-pointer ml-2"
          >
            {isSaving && isManualSave ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}