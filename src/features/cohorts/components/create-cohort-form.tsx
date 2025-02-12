"use client";
import { useActionState } from "react";
import { addCohortAction } from "@/features/cohorts/actions";
import {
  Button,
  DialogContent,
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components";
import { useState } from "react";
import { Plus } from "lucide-react";
export function AddCohortForm() {
  const [state, formAction, isPending] = useActionState(
    addCohortAction,
    undefined
  );
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="submit"
          variant="outline"
          className="cursor-pointer flex gap-1 justify-center items-center mt-4 mb-4"
        >
          <Plus className="text-primary font-semibold" size={18} />
          <p className="font-semibold">Add new cohort</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add cohort</DialogTitle>
          <DialogDescription>
            Add a new cohort here. Click submit when you´re done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-2">
          <div>
            <label htmlFor="name" className="text-sm">
              Cohort Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="border px-2 py-1 w-full"
              placeholder="FS-2025"
              required
            />
            {state?.errorMessages?.titleError && (
              <p className="text-red-600 text-sm">
                {state.errorMessages.titleError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="text-sm">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="border px-2 py-1 w-full"
            />
          </div>

          <div>
            <label htmlFor="status" className="text-sm">
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
          <div className="flex justify-center">
            <Button type="submit" disabled={isPending} className="w-full my-2">
              {isPending ? "Creating..." : "Create Cohort"}
            </Button>
          </div>

          {state?.successMessage && (
            <p className="text-green-600 text-sm">{state.successMessage}</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
