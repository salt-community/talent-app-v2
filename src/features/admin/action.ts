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
  await adminService.repopulateMeilisearch();
  revalidatePath("/admin/meilisearch-configuration");
}

export async function syncMeilisearchAction() {
  await adminService.syncMeilisearch();
  revalidatePath("/admin/meilisearch-configuration");
}

export async function updateMeilisearchSettingsAction(formData: FormData) {
  const settings: Settings = Object.fromEntries(formData.entries());
  console.log(settings);
  await adminService.updateMeilisearchSettings(settings);
  revalidatePath("/admin/meilisearch-configuration");
}

export async function resetMeilisearchSettingsAction() {
  await adminService.resetMeilisearchSettings();
  revalidatePath("/admin/meilisearch-configuration");
}
