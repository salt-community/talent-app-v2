import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { addCohortAction } from "@/features/cohorts/actions";

export function AddCohortForm() {
  const [state, formAction, isPending] = useActionState(
    addCohortAction,
    undefined
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-semibold">
          Cohort Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
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
        <label htmlFor="description" className="block font-semibold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="border px-2 py-1 w-full"
        />
      </div>

      <div>
        <label htmlFor="status" className="block font-semibold">
          Status
        </label>
        <select
          id="status"
          name="status"
          className="border px-2 py-1 w-full"
          required
        >
          <option value="planned">Planned</option>
          <option value="ongoing">Ongoing</option>
          <option value="finished">Finished</option>
        </select>
      </div>

      <div>
        <label htmlFor="identityId" className="block font-semibold">
          Identity ID
        </label>
        <input
          id="identityId"
          name="identityId"
          type="text"
          className="border px-2 py-1 w-full"
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Cohort"}
      </Button>

      {state?.successMessage && (
        <p className="text-green-600 text-sm">{state.successMessage}</p>
      )}
    </form>
  );
}
