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
import { Edit } from "lucide-react";
import { Assignment } from "@/features/assignments";


type Props = {
  cohortId: string;
  assignment: Assignment;
};

export default function EditAssignmentButton({ cohortId, assignment }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Edit
            className="hover:text-blue-500 cursor-pointer"
            aria-label="Edit"
            size={18}
            onClick={() => setOpen(true)}
          />
        </DialogTrigger>
        <VisuallyHidden>
          <DialogTitle>Edit Assignment</DialogTitle>
        </VisuallyHidden>
        <DialogContent>
          <AddAssignmentForm
            cohortId={cohortId}
            assignemnt={assignment}
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
