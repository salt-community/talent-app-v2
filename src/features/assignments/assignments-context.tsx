"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Assignment } from "./types";
import {
  addAssignmentAction,
  updateAssignmentAction,
  getAllAssignmentsAction,
  deleteAssignmentAction,
  deleteAllAssignmentsAction,
} from "./actions";

type AssignmentsContextValue = {
  assignments: Assignment[];
  loadAssignments: () => Promise<void>;
  createAssignment: (formData: FormData) => Promise<void>;
  updateAssignment: (assignmentId: string, formData: FormData) => Promise<void>;
  deleteAssignment: (assignmentId: string) => Promise<void>;
  deleteAllAssignments: () => Promise<void>;
};

const AssignmentsContext = createContext<AssignmentsContextValue>({
  assignments: [],
  loadAssignments: async () => {},
  createAssignment: async () => {},
  updateAssignment: async () => {},
  deleteAssignment: async () => {},
  deleteAllAssignments: async () => {},
});

type AssignmentsProviderProps = {
  children: ReactNode;
  initialAssignments?: Assignment[];
};

export function AssignmentsProvider({
  children,
  initialAssignments = [],
}: AssignmentsProviderProps) {
  const [assignments, setAssignments] =
    useState<Assignment[]>(initialAssignments);

  const loadAssignments = useCallback(async () => {
    try {
      const newAssignments = await getAllAssignmentsAction(assignments, {});
      setAssignments(newAssignments ?? []);
    } catch (error) {
      console.error("Failed to load assignments:", error);
    }
  }, [assignments]);

  const createAssignment = useCallback(
    async (formData: FormData) => {
      try {
        await addAssignmentAction(null, formData);

        await loadAssignments();
      } catch (error) {
        console.error("Failed to create assignment:", error);
      }
    },
    [loadAssignments]
  );

  const updateAssignment = useCallback(
    async (assignmentId: string, formData: FormData) => {
      try {
        if (!formData.has("assignmentId")) {
          formData.set("assignmentId", assignmentId);
        }
        await updateAssignmentAction(undefined, formData);
        await loadAssignments();
      } catch (error) {
        console.error("Failed to update assignment:", error);
      }
    },
    [loadAssignments]
  );
  const deleteAssignment = useCallback(
    async (assignmentId: string) => {
      try {
        const formData = new FormData();
        formData.set("assignmentId", assignmentId);
        await deleteAssignmentAction(formData);
        await loadAssignments();
      } catch (error) {
        console.error("Failed to delete assignment:", error);
      }
    },
    [loadAssignments]
  );

  const deleteAllAssignments = useCallback(async () => {
    try {
      await deleteAllAssignmentsAction();
      await loadAssignments();
    } catch (error) {
      console.error("Failed to delete all assignments:", error);
    }
  }, [loadAssignments]);

  return (
    <AssignmentsContext.Provider
      value={{
        assignments,
        loadAssignments,
        createAssignment,
        updateAssignment,
        deleteAssignment,
        deleteAllAssignments,
      }}
    >
      {children}
    </AssignmentsContext.Provider>
  );
}

export function useAssignments() {
  return useContext(AssignmentsContext);
}
