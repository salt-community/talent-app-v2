"use server";

import { revalidatePath } from "next/cache";
import { adminService } from "./instance";

export async function deleteDeveloperProfileAction(id: string) {
  await adminService.deleteDeveloperProfile(id);
  revalidatePath("/dashboard");
}

export async function updateStatusAction(
  id: string,
  status: "unpublished" | "published" | "highlighted"
) {
  await adminService.updateStatus(id, status);
}
