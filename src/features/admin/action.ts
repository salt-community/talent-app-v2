"use server";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { adminService } from "./instance";
import { assignmentSchema } from "./validation";

export async function deleteDeveloperProfileAction(id: string) {
  await adminService.deleteDeveloperProfile(id);
  revalidatePath("/dashboard");
}

export async function updateStatusAction(id: string, status: string) {
  await adminService.updateStatus(id, status);
}

export async function repopulateMeilisearchAction() {
  await adminService.repopulateSearch();
  revalidatePath("/admin/meilisearch-configuration");
}

export async function syncMeilisearchAction() {
  await adminService.syncSearch();
  revalidatePath("/admin/meilisearch-configuration");
}

export async function updateMeilisearchSettingsAction(formData: FormData) {
  const synonymsData = formData.get("synonyms") as string;
  const parsedSynonyms = JSON.parse(synonymsData) as [string, string[]][];
  const synonyms = Object.fromEntries(parsedSynonyms);
  const settings = { synonyms: synonyms };

  await adminService.updateSearchSettings(settings);
  revalidatePath("/admin/meilisearch-configuration");
}

export async function resetMeilisearchSettingsAction() {
  await adminService.resetSearchSettings();
  revalidatePath("/admin/meilisearch-configuration");
}

export async function createAssignmentAction(formData: FormData) {
  const title = formData.get("title") as string;
  const comment = formData.get("comment") as string;
  const cohortId = formData.get("cohortId") as string;
  const categories = (formData.get("categories") as string).split(",");

  try {
    assignmentSchema.parse({
      title,
      comment,
      cohortId,
      categories,
    });

    const newAssignment = {
      title,
      score: 0,
      cohortId,
      comment,
      categories,
    };

    await adminService.createAssignment(newAssignment);
    revalidatePath("/admin/instructors/assignments");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed:", error.errors);
      throw new Error(
        "Validation failed: " + error.errors.map((e) => e.message).join(", ")
      );
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
}
