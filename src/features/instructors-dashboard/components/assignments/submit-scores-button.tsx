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
export function SubmitScoresButton() {
  const [open, setOpen] = useState(false);
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
        <DialogContent>{/* Coming later */}</DialogContent>
      </Dialog>
    </>
  );
}
