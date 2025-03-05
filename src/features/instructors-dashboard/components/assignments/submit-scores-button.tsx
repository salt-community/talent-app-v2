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

type Props = {
  assignmentId: string;
  status: string;
};

export function SubmitScoresButton({ assignmentId, status }: Props) {
  const [open, setOpen] = useState(false);

  const publishScores = async () => {
    //update status of the assignment
    console.log(assignmentId, status);
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-zinc-900 text-white rounded-md h-10 hover:bg-zinc-800 my-2"
            onClick={() => setOpen(true)}
          >
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
              <Button
                className="bg-zinc-900 text-white rounded-md h-10 hover:bg-zinc-800"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-zinc-900 text-white rounded-md h-10 hover:bg-zinc-800"
                onClick={publishScores}
              >
                Publish
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
