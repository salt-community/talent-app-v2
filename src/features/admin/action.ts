"use server";

import { revalidatePath } from "next/cache";
import { adminService } from "./instance";
import { DeveloperProfileStatus } from "@/features";

export async function deleteDeveloperProfileAction(id: string) {
  await adminService.deleteDeveloperProfile(id);
  revalidatePath("/dashboard");
}

export async function updateStatusAction(
  id: string,
  status: DeveloperProfileStatus,
) {
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
