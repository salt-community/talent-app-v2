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
import { Assignment } from "../../types";

type Props = {
  cohortId: string;
  assignment: Assignment;
};

export default function AddAssignmentButton({ cohortId, assignment }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="my-2 cursor-pointer" onClick={() => setOpen(true)}>
          <span>+</span> New assignment
        </Button>
      </DialogTrigger>
      <VisuallyHidden>
        <DialogTitle>New Assignment</DialogTitle>
      </VisuallyHidden>
      <DialogContent>
        <AddAssignmentForm
          cohortId={cohortId}
          onSuccess={() => setOpen(false)}
          assignment={assignment}
          isNewAssignment={true}
        />
      </DialogContent>
    </Dialog>
  );
}
