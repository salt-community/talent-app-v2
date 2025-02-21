"use server";

import { errorHandler } from "@/lib";
import { revalidatePath } from "next/cache";
import { backgroundsService } from "../backgrounds/instance";

export async function addDeveloperProfileAction(identityId: string) {
  try {
    await backgroundsService.createDeveloperProfile(identityId);
  } catch (error) {
    errorHandler(error);
  }
  revalidatePath("/profile");
}
