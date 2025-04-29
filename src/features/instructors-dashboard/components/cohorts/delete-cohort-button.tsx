"use client";
import { TrashIcon } from "lucide-react";
import React from "react";
import { deleteCohortAndCohortIdentityAction } from "../../action";
import { AlertDialogDemo, Button } from "@/components";
import toast from "react-hot-toast";

type Props = {
  cohortId: string;
  name: string;
};

export function DeleteCohortButton({ cohortId, name }: Props) {


  async function handleDelete() {
    toast.promise(new Promise(async (resolve) => {
      await deleteCohortAndCohortIdentityAction(cohortId);
      resolve(true);
    }), {
      loading: "Deleting cohort...",
      success: `Cohort ${name} deleted successfully!`,
      error: <b>Could not delete cohort. Please try again.</b>,
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
