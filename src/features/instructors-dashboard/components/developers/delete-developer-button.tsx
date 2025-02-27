import { TrashIcon } from "lucide-react";
import React from "react";
import { deleteIdentityFromCohortAction } from "../../action";
import { AlertDialogDemo, Button } from "@/components";
import { useToast } from "@/hooks/use-toast";

type Props = {
  identityId: string;
  name: string;
};

export function DeleteDeveloperButton({ identityId, name }: Props) {
  const { toast } = useToast();
  async function handleDelete() {
    await deleteIdentityFromCohortAction(identityId);
    toast({
      title: "Developer deleted",
      description: (
        <>
          <strong>{name}</strong> has been removed from the cohort
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
          className="hover:text-destructive"
          aria-label="Delete"
        >
          <TrashIcon size={18} />
        </Button>
      </AlertDialogDemo>
    </div>
  );
}
