"use client";

import { AssignmentScore, Developer, ScoreStatus } from "../../types";
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

export function Developers({
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
    <div className="py-2 px-3 border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between mb-1">
        <div className="font-medium text-sm truncate max-w-[70%]">
          {developer.name}
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Switch
                  id={`publish-mode-${developer.id}`}
                  onCheckedChange={togglePublishStatus}
                  checked={published}
                  disabled={!scored}
                  className="scale-75"
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

      <div className="flex items-center">
        <AssignmentStatus published={published} scored={scored} />
      </div>
    </div>
  );
}
