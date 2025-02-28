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
import { Scoring } from "./scoring";
import { Assignment } from "../../types";



export default function OpenScoreFormButton({ assignment }: Assignment) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            className="px-3 py-1.5 border border-gray-300 rounded text-sm"
            variant={"ghost"}
          >
            Score
          </Button>
        </DialogTrigger>
        <VisuallyHidden>
          <DialogTitle>Score</DialogTitle>
        </VisuallyHidden>
        <DialogContent>
          <Scoring
            assignment={{ assignment }}
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
