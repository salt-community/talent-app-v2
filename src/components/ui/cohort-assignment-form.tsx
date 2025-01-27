"use client";

import { useActionState } from "react";
import { addAssignmentAction } from "@/features/assignments/actions";

export function AddAssignmentForm() {
  const [state, formAction, isPending] = useActionState(addAssignmentAction, {
    errorMessages: undefined,
    successMessage: undefined,
  });

  return (
    <form action={formAction} className="space-y-4 w-full max-w-md">
      <div>
        <label className="block font-semibold">Add assignment to Cohort</label>
        <input
          type="text"
          name="title"
          className="border px-2 py-1 w-full"
          required
        />

        {state?.errorMessages?.titleError && (
          <p className="text-red-600 text-sm">
            {state.errorMessages.titleError}
          </p>
        )}
      </div>

      <div>
        <label className="block font-semibold">Tags (comma-separated)</label>
        <input type="text" name="tags" className="border px-2 py-1 w-full" />
      </div>

      <div>
        <label className="block font-semibold">Cohort ID</label>
        <input
          type="text"
          name="cohortId"
          className="border px-2 py-1 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold">Comment</label>
        <textarea name="comment" className="border px-2 py-1 w-full" />
      </div>

      <div>
        <label className="block font-semibold">
          Categories (comma-separated)
        </label>
        <input
          type="text"
          name="categories"
          className="border px-2 py-1 w-full"
        />
      </div>

      {state?.successMessage && (
        <p className="text-green-600 font-bold">{state.successMessage}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {isPending ? "Submitting..." : "Add Assignment"}
      </button>
    </form>
  );
}
