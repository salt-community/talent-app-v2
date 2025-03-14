"use client";
import { Developer, ScoreStatus } from "../../types";
import OpenScoreFormButton from "./open-score-form-button";
import { AlertCircle, Check, CheckCheck } from "lucide-react";
import { AssignmentScore } from "@/features/assignments";
import { Switch } from "@/components/ui/switch";
import { updateScoreStatusesAction } from "../../action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AssignmentStatus from "./assignment-status";

type Props = {
  developer: Developer;
  scores: AssignmentScore[];
  scored?: boolean;
  published?: boolean;
};

export default function Developers({
  developer,
  scores,
  scored = false,
  published = false,
}: Props) {
  const togglePublishStatus = async () => {
    if (!scored) return;

    const newStatus = published ? "unpublished" : "published";

    const scoreStatuses: ScoreStatus[] = scores.map((score) => ({
      assignmentId: score.assignmentId,
      identityId: score.identityId,
      status: newStatus,
    }));

    await updateScoreStatusesAction(scoreStatuses);
  };

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
              <AssignmentStatus published={published} scored={scored} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Switch
                      id={`publish-mode-${developer.id}`}
                      onCheckedChange={togglePublishStatus}
                      checked={published}
                      disabled={!scored}
                    />
                  </div>
                </TooltipTrigger>
                {!scored && (
                  <TooltipContent>
                    <p>Cannot publish until assignment is scored</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
          <OpenScoreFormButton scores={scores} />
        </div>
      </div>
    </div>
  );
}
