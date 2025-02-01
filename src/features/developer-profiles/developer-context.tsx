"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { developerProfilesService } from "./instance";
import type { Developer } from "./types";

type DevelopersContextValue = {
  developers: Developer[];
  loadDevelopers: () => Promise<void>;
  deleteDeveloper: (id: string) => Promise<void>;
  updateDeveloperStatus: (
    id: string,
    status: Developer["status"]
  ) => Promise<void>;
};

const DevelopersContext = createContext<DevelopersContextValue>({
  developers: [],
  loadDevelopers: async () => {},
  deleteDeveloper: async () => {},
  updateDeveloperStatus: async () => {},
});

type DevelopersProviderProps = {
  children: ReactNode;
  initialDevelopers?: Developer[];
};

export function DevelopersProvider({
  children,
  initialDevelopers = [],
}: DevelopersProviderProps) {
  const [developers, setDevelopers] = useState<Developer[]>(initialDevelopers);

  const loadDevelopers = useCallback(async () => {
    try {
      const allDevs = await developerProfilesService.getAll();
      setDevelopers(allDevs);
    } catch (error) {
      console.error("Failed to load developers:", error);
    }
  }, []);

  const deleteDeveloper = useCallback(async (id: string) => {
    try {
      await developerProfilesService.delete(id);
      // Re-fetch or manually remove from local state
      setDevelopers((prev) => prev.filter((dev) => dev.id !== id));
    } catch (error) {
      console.error("Failed to delete developer:", error);
    }
  }, []);

  const updateDeveloperStatus = useCallback(
    async (id: string, status: Developer["status"]) => {
      try {
        await developerProfilesService.updateStatus({ id, status });
        setDevelopers((prev) =>
          prev.map((dev) => (dev.id === id ? { ...dev, status } : dev))
        );
      } catch (error) {
        console.error("Failed to update developer status:", error);
      }
    },
    []
  );

  return (
    <DevelopersContext.Provider
      value={{
        developers,
        loadDevelopers,
        deleteDeveloper,
        updateDeveloperStatus,
      }}
    >
      {children}
    </DevelopersContext.Provider>
  );
}

export function useDevelopers() {
  return useContext(DevelopersContext);
}
