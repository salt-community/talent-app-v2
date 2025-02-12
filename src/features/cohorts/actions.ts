"use server";

import { revalidatePath } from "next/cache";
import { ReactNode } from "react";
import { ZodError } from "zod";
import { errorHandler } from "@/lib";
import { cohortsService } from "./instance";
import { getCohortFormData } from "./utils";
import { CohortFormData } from "./types";

export async function addCohortAction(
  _: unknown,
  formData: FormData
): Promise<
  | {
      successMessage: ReactNode;
      errorMessages?: {
        titleError?: string;
      };
      newCohort?: CohortFormData;
    }
  | undefined
> {
  const { name, description, status } = getCohortFormData(formData);

  const newCohort: CohortFormData = {
    name,
    description: description || "",
    status: status as "planned",
  };

  try {
    await cohortsService.createCohort(newCohort);
  } catch (error) {
    if (error instanceof ZodError) {
      const titleError = error.flatten().fieldErrors.title?.[0];
      return {
        successMessage: null,
        errorMessages: { titleError },
        newCohort: newCohort,
      };
    }
    errorHandler(error);
  }

  revalidatePath("/cohorts");
}

export async function fetchCohortsAction() {
  try {
    return await cohortsService.getAll();
  } catch (error) {
    errorHandler(error);
    return [];
  }
}
export async function getCohortStudents(cohortId: string) {
  return await cohortsService.getCohortStudents(cohortId);
}
