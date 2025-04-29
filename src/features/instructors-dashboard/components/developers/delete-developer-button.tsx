import { TrashIcon } from "lucide-react";
import React from "react";
import { deleteIdentityFromCohortAction } from "../../action";
import { AlertDialogDemo, Button } from "@/components";
import toast from "react-hot-toast"
type Props = {
  identityId: string;
  name: string;
};

export function DeleteDeveloperButton({ identityId, name }: Props) {

  async function handleDelete() {
    toast.promise(new Promise(async (resolve, reject) => {
      const result = await deleteIdentityFromCohortAction(identityId);
      if (result.success) {
        resolve(true);
      } else {
        reject(new Error(result.error));
      }
    }
    ), {
      loading: "Deleting developer...",
      success: `${name} has been deleted successfully!`,
      error: `${name} could not be deleted! Please try again.`,
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
