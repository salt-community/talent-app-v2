"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TrashIcon } from "lucide-react";
import { CopyAssignmentButton } from "./copy-assignment-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components";
import { deleteAssignment } from "../../actions";

type Assignment = {
  id: string;
  title: string;
};

type AssignmentListProps = {
  assignments: Assignment[];
  cohortName: string;
};

export function AssignmentList({
  assignments,
  cohortName,
}: AssignmentListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (assignmentId: string) => {
    try {
      setIsDeleting(assignmentId);
      const formData = new FormData();
      formData.append("assignmentId", assignmentId);
      await deleteAssignment(formData);
    } catch (error) {
      console.error("Failed to delete assignment:", error);
    } finally {
      setIsDeleting(null);
      setDeletingId(null);
    }
  };

  if (assignments.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg bg-gray-50">
        <p className="text-gray-500">
          No assignments found. Create a new assignment to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <div
          key={assignment.id}
          className="flex justify-between items-center border-b pb-4"
        >
          <div className="flex items-center gap-4">
            <Link
              href={`/instructor-dashboard/cohorts/${cohortName}/assignments/${assignment.title}`}
              className="text-blue-700 font-medium hover:underline hover:underline-offset-4"
            >
              {assignment.title}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <CopyAssignmentButton
              link={`/instructor-dashboard/cohorts/${cohortName}/assignments/${assignment.title}`}
            />

            <AlertDialog
              open={deletingId === assignment.id}
              onOpenChange={(isOpen) => !isOpen && setDeletingId(null)}
            >
              <AlertDialogTrigger asChild>
                <button
                  className="text-red-500 hover:bg-gray-100 p-1.5 rounded-md transition-colors"
                  aria-label="Delete assignment"
                  onClick={() => setDeletingId(assignment.id)}
                  disabled={isDeleting === assignment.id}
                >
                  <TrashIcon size={18} />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will permanently delete the assignment "
                    {assignment.title}". This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(assignment.id)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    {isDeleting === assignment.id ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
}
