import { TrashIcon } from "lucide-react";
import React from "react";
import { deleteIdentityFromCohortAction } from "../../action";
import { AlertDialogDemo } from "@/components";

export function DeleteDeveloperButton({ identityId }: { identityId: string }) {
  async function handleDelete() {
    await deleteIdentityFromCohortAction(identityId);
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
