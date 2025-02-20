"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AddAssignmentForm } from "./add-assignment-form";

type Props = {
  cohorts: { id: string; name: string }[];
};

export default function AddAssignmentButton({ cohorts }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="" onClick={() => setOpen(true)}>
            <span>+</span> New assignment
          </button>
        </DialogTrigger>
        <VisuallyHidden>
          <DialogTitle>New Assignment</DialogTitle>
        </VisuallyHidden>
        <DialogContent>
          <AddAssignmentForm
            cohorts={cohorts}
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
