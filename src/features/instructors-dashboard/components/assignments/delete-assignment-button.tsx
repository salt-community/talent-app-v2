"use client";
import { TrashIcon } from "lucide-react";
import React from "react";
import { AlertDialogDemo, Button } from "@/components";
import { useToast } from "@/hooks/use-toast";
import { deleteAssignmentByIdAction } from "../../action";

type Props = {
  assignmentId: string;
  name: string;
};

export function DeleteAssignmentButton({ assignmentId, name }: Props) {
  const { toast } = useToast();

  async function handleDelete() {
    const result = await deleteAssignmentByIdAction(assignmentId);

    if (result.success) {
      toast({
        title: "Assignment deleted",
        description: (
          <>
            The assignment <strong>{name}</strong> has been deleted
          </>
        ),
      });
    } else {
      toast({
        title: "Error",
        description: ` ${result.error || "Unknown error"}`,
      });
    }
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
          className="hover:text-destructive"
          aria-label="Delete"
        >
          <TrashIcon size={18} />
        </Button>
      </AlertDialogDemo>
    </div>
  );
}
