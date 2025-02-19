"use server";
import { revalidatePath } from "next/cache";
import { adminService } from "../admin/instance";

const getIamService = async () => {
  const { iamService } = await import("./instance");
  return iamService;
};
