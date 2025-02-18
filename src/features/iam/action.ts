"use server";
import { revalidatePath } from "next/cache";
import { adminService } from "../admin/instance";

const getIamService = async () => {
  const { iamService } = await import("./instance");
  return iamService;
};

export async function updateRoleAction(id: string, newRole: string) {
  const iamService = await getIamService();
  await iamService.updateRole(id, newRole);
  revalidatePath("/dashboard/roles");
}

export async function deleteUserAction(id: string) {
  await adminService.deleteUser(id);
  revalidatePath("/admin/identities");
}
