"use client";
import { TrashIcon } from "lucide-react";
import React from "react";
import { AlertDialogDemo } from "@/components";
import { useToast } from "@/hooks/use-toast";
import { deleteAssignmentByIdAction } from "../../action";

type Props = {
  assignmentId: string;
  name: string;
};

export function DeleteAssignmentButton({ assignmentId, name }: Props) {
  const { toast } = useToast();

  async function handleDelete() {
    await deleteAssignmentByIdAction(assignmentId);
    toast({
      title: "Assignment deleted",
      description: (
        <>
          The assignment <strong>{name}</strong> has been deleted
        </>
      ),
    });
  }

  return (
    <div>
      <AlertDialogDemo
        title="Are you sure?"
        description="This action can't be undone, are you sure?"
        onConfirm={handleDelete}
      >
        <button
          className="text-red-500 hover:bg-gray-100 p-1.5 rounded-md transition-colors"
          aria-label="Delete"
        >
          <TrashIcon size={18} />
        </button>
      </AlertDialogDemo>
    </div>
  );
}
