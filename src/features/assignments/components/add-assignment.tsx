import { useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { addAssignmentAction } from "../actions";

export function AddAssignmentForm() {
  const [state, formAction, isPending] = useActionState(
    addAssignmentAction,
    null
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2" size={16} />
          Add Assignment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Assignment</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
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
            {state?.errorMessages?.titleError && (
              <p className="mt-1 text-sm text-red-600">
                {state.errorMessages.titleError}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              name="tags"
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
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add Assignment"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
