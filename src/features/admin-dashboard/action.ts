"use server";
import { revalidatePath } from "next/cache";
import { adminService } from "./instance";

export async function deleteDeveloperProfileAction(id: string) {
  await adminService.deleteDeveloperProfile(id);
  revalidatePath("/dashboard");
}

export async function updateStatusAction(id: string, status: string) {
  await adminService.updateStatus({ id, status });
}

export async function repopulateMeilisearchAction() {
  await adminService.repopulateSearch();
  revalidatePath("/admin/meilisearch-configuration");
}

export async function ensureSearchIndexesAction() {
  await adminService.ensureSearchIndexes();
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

export async function updateRoleAction(id: string, newRole: string) {
  await adminService.updateRole({ id, newRole });
  revalidatePath("/dashboard/identities");
}
export async function deleteUserAction(id: string) {
  await adminService.deleteUser(id);
  revalidatePath("/admin/identities");
}
