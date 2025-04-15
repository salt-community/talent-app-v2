"use server";
import { resolve } from "node:path";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { revalidatePath } from "next/cache";
import { adminService } from "./instance";
import { assignmentsMigrationScript } from "@/assignments-migration-script";

export async function deleteDeveloperProfileAction(id: string) {
  await adminService.deleteDeveloperProfile(id);
  revalidatePath("/admin-dashboard");
}

export async function updateStatusAction(id: string, status: string) {
  await adminService.updateStatus({ id, status });
}

export async function repopulateMeilisearchAction() {
  await adminService.repopulateSearch();
  revalidatePath("/admin-dashboard/meilisearch-configuration");
}

export async function ensureSearchIndexAction() {
  await adminService.ensureSearchIndex();
  revalidatePath("/admin-dashboard/meilisearch-configuration");
}

export async function syncMeilisearchAction() {
  await adminService.syncSearch();
  revalidatePath("/admin-dashboard/meilisearch-configuration");
}

export async function updateMeilisearchSettingsAction(formData: FormData) {
  const synonymsData = formData.get("synonyms") as string;
  const parsedSynonyms = JSON.parse(synonymsData) as [string, string[]][];
  const synonyms = Object.fromEntries(parsedSynonyms);
  const settings = { synonyms: synonyms };

  await adminService.updateSearchSettings(settings);
  revalidatePath("/admin-dashboard/meilisearch-configuration");
}

export async function updateRoleAction(id: string, newRole: string) {
  await adminService.updateRole({ id, newRole });
  revalidatePath("/admin-dashboard/identities");
}
export async function deleteUserAction(id: string) {
  await adminService.deleteUser(id);
  revalidatePath("/admin-dashboard/identities");
}

export async function runMigration() {
  const rootDir = process.cwd();
  const db = drizzle(process.env.DATABASE_URL!);
  await migrate(db, { migrationsFolder: resolve(rootDir, "./drizzle") });
}
export async function runDataMigration() {
  assignmentsMigrationScript();
}
