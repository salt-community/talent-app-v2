"use server";
import { revalidatePath } from "next/cache";
import { iamService } from "./instance";
import { IdentityRole } from "./types";

export async function updateRoleAction(id: string, newRole: IdentityRole) {
  await iamService.updateRole(id, newRole);
  revalidatePath("/dashboard/roles");
}
