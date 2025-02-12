"use client";
import { Button } from "@/components/ui/button";
import { createAssignmentAction } from "@/features/admin/action";

export function AddAssignmentForm() {
  return (
    <form action={createAssignmentAction} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
        {/* {state?.errorMessages?.titleError && (
              <p className="mt-1 text-sm text-red-600">
                {state.errorMessages.titleError}
              </p>
            )} */}
      </div>
      <div>
        <label
          htmlFor="categories"
          className="block text-sm font-medium text-gray-700"
        >
          Categories (comma-separated)
        </label>
        <input
          id="categories"
          name="categories"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="cohortId"
          className="block text-sm font-medium text-gray-700"
        >
          Cohort ID
        </label>
        <input
          id="cohortId"
          name="cohortId"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >
          Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <Button type="submit" className="w-full ">
        {/* {isPending ? "Adding..." : "Add Assignment"} */}
        Submit
      </Button>
    </form>
  );
}
