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
          <Button
            variant="ghost"
            className="hover:text-green-600"
            aria-label="Edit"
          >
            <Edit size={18} />
          </Button>
        </DialogTrigger>
        <VisuallyHidden>
          <DialogTitle>Edit Assignment</DialogTitle>
        </VisuallyHidden>
        <DialogContent>
          <AddAssignmentForm
            cohortId={cohortId}
            assignment={assignment}
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
