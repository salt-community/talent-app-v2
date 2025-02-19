"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components";
import { AddAssignmentForm } from "./add-assignment-form";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Props = {
  cohorts: { id: string; name: string }[];
};

export default function AddAssignmentButton({ cohorts }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="bg-green-600 text-white px-4 py-1 rounded-md flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <span>+</span> New assignment
          </button>
        </DialogTrigger>
        <VisuallyHidden>
          <DialogTitle>New Assignment</DialogTitle>
        </VisuallyHidden>
        <DialogContent>
          <AddAssignmentForm cohorts={cohorts} />
        </DialogContent>
      </Dialog>
    </>
  );
}
