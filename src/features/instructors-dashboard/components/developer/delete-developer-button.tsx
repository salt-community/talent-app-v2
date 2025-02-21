import { TrashIcon } from "lucide-react";
import React from "react";
import { deleteIdentityFromCohortAction } from "../../action";

export function DeleteDeveloperButton({ identityId }: { identityId: string }) {
  async function handleDelete() {
    await deleteIdentityFromCohortAction(identityId);
  }
  return (
    <div>
      <button
        className="text-red-500 hover:bg-gray-100 p-1.5 rounded-md transition-colors"
        aria-label="Delete"
        onClick={handleDelete}
      >
        <TrashIcon size={18} />
      </button>
    </div>
  );
}
