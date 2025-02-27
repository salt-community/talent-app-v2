"use client";
import { TrashIcon } from "lucide-react";
import React from "react";
import { deleteCohortAndCohortIdentityAction } from "../../action";
import { AlertDialogDemo, Button } from "@/components";
import { useToast } from "@/hooks/use-toast";

type Props = {
  cohortId: string;
  name: string;
};

export function DeleteCohortButton({ cohortId, name }: Props) {
  const { toast } = useToast();
  async function handleDelete() {
    await deleteCohortAndCohortIdentityAction(cohortId);
    toast({
      title: "Cohort deleted",
      description: (
        <>
          Cohort <strong>{name}</strong> has been deleted
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
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-destructive"
          aria-label="Delete"
        >
          <TrashIcon size={18} />
        </Button>
      </AlertDialogDemo>
    </div>
  );
}
