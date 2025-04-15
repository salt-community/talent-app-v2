"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  Button,
  ScrollArea,
} from "@/components";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function OpenScoreFormButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            className="px-3 py-1.5 border border-gray-300 rounded text-sm"
            variant={"ghost"}
            disabled={false}
          >
            Score
          </Button>
        </DialogTrigger>
        <VisuallyHidden>
          <DialogTitle>Score</DialogTitle>
        </VisuallyHidden>
        <DialogContent className="max-h-screen">
          <ScrollArea className="h-[80vh]"></ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
