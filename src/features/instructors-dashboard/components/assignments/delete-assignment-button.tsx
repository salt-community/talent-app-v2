"use client";
import { TrashIcon } from "lucide-react";
import React from "react";
import { AlertDialogDemo, Button } from "@/components";
import { deleteAssignmentByIdAction } from "../../action";
import toast from "react-hot-toast";

type Props = {
  assignmentId: string;
  name: string;
};

export function DeleteAssignmentButton({ assignmentId, name }: Props) {
  function handleDelete() {
    toast.promise(
      (async () => {
        const result = await deleteAssignmentByIdAction(assignmentId);
        if (!result.success) {
          throw new Error(result.error);
        }
        return true;
      })(),
      {
        loading: "Deleting assignment...",
        success: () => {
          return `Assignment ${name} deleted successfully`;
        },
        error: (error) => {
          return `${error.message}`;
        },
      }
    );
  }

  return (
    <div>
      <AlertDialogDemo
        title="Are you sure?"
        description="This action can't be undone, are you sure?"
        onConfirm={handleDelete}
      >
        <Button
          variant="ghost"
          className="hover:text-destructive curosor-pointer"
          aria-label="Delete"
        >
          <TrashIcon size={18} />
        </Button>
      </AlertDialogDemo>
    </div>
  );
}
