"use server";

import { adminService } from "./instance";

export async function deleteDeveloperProfile(id: string) {
  await adminService.deleteDeveloperProfile(id);
}
