"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Assignment } from "../types";

interface EditAssignmentFormProps {
  assignment: Assignment;
}

export function EditAssignmentForm({ assignment }: EditAssignmentFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsUpdating(true);
    setErrorMessage(null);

    try {
      setIsDialogOpen(false);
    } catch (error) {
      setErrorMessage("Failed to update assignment (score or other fields).");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              name="title"
              type="text"
              defaultValue={assignment.title}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-xs"
            />
          </div>

          {/* Score */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Score (0–100)
            </label>
            <input
              name="score"
              type="number"
              min={0}
              max={100}
              // defaultValue={assignment.score?.toString() ?? "0"}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-xs"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags (comma-separated)
            </label>
            <input
              name="tags"
              type="text"
              //defaultValue={assignment.tags.join(", ")}
              className="mt-1 block w-full rounded-md"
            />
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            {isUpdating ? "Updating..." : "Update Assignment"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
