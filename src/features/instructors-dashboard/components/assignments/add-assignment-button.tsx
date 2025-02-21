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
          <Button
            className="bg-zinc-900 text-white rounded-md h-10 hover:bg-zinc-800 my-2"
            onClick={() => setOpen(true)}
          >
            <span>+</span> New assignment
          </Button>
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
