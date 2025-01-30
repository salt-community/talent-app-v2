"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Assignment } from "./types";

import { getAllAssignmentsAction, addAssignmentAction } from "./actions";

type AssignmentsContextType = {
  assignments: Assignment[];
  loadAssignments: () => Promise<void>;
  createAssignment: (formData: FormData) => Promise<void>;
};

const AssignmentsContext = createContext<AssignmentsContextType>({
  assignments: [],
  loadAssignments: async () => {},
  createAssignment: async () => {},
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
      const fetchedAssignments = await getAllAssignmentsAction(assignments, {});
      setAssignments(fetchedAssignments);
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

  return (
    <AssignmentsContext.Provider
      value={{
        assignments,
        loadAssignments,
        createAssignment,
      }}
    >
      {children}
    </AssignmentsContext.Provider>
  );
}

export function useAssignments() {
  return useContext(AssignmentsContext);
}
