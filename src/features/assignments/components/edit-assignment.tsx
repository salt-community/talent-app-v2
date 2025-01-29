"use client";

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
import { Assignment } from "../types";
import { createAssignmentsService } from "../service";

interface EditAssignmentFormProps {
  assignment: Assignment;
}

export function EditAssignmentForm({ assignment }: EditAssignmentFormProps) {
  const [state, formAction, isPending] = useActionState(createAssignmentsService: {
    successMessage: null,
    errorMessages: { titleError: undefined },
    newAssignment: assignment,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2" size={16} />
          Edit Assignment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Assignment</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="assignmentId" value={assignment.id} />

          {/* Title */}
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
              defaultValue={assignment.title}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {state?.errorMessages?.titleError && (
              <p className="mt-1 text-sm text-red-600">
                {state.errorMessages?.titleError}
              </p>
            )}
          </div>

          {/* Tags */}
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
              defaultValue={assignment.tags.join(", ")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Cohort ID */}
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
              defaultValue={assignment.cohortId ?? ""}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Comment */}
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
              defaultValue={assignment.comment ?? ""}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Categories */}
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
              defaultValue={assignment.categories?.join(", ") ?? ""}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update Assignment"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
