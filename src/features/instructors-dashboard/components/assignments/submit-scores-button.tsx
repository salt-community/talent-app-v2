"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  Button,
} from "@/components";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ScoreStatus } from "../../types";
import { updateScoreStatusesAction } from "../../action";

type Props = {
  scoreStatuses: ScoreStatus[];
};

export function SubmitScoresButton({ scoreStatuses }: Props) {
  const [open, setOpen] = useState(false);

  const publishScores = async () => {
    await updateScoreStatusesAction(scoreStatuses);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer" onClick={() => setOpen(true)}>
            Publish Scores
          </Button>
        </DialogTrigger>
        <VisuallyHidden>
          <DialogTitle>Submit Scores</DialogTitle>
        </VisuallyHidden>
        <DialogContent>
          <div className="flex flex-col space-y-4">
            <p>Are you sure you want to publish the scores?</p>
            <div className="flex justify-end space-x-4">
              <Button className="cursor-pointer" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button className="cursor-pointer" onClick={publishScores}>
                Publish
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
