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
  status: DeveloperProfileStatus
) {
  await adminService.updateStatus(id, status);
}
