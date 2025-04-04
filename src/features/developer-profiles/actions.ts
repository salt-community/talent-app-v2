"use server";

import { errorHandler } from "@/lib";
import { revalidatePath } from "next/cache";
import { developerProfilesService } from "./instance";
import { CvInfo } from "./types";

export async function addDeveloperProfileAction(identityId: string) {
  try {
    await developerProfilesService.createDeveloperProfile(identityId);
  } catch (error) {
    errorHandler(error);
  }
  revalidatePath("/profile");
}

export async function copyDeveloperProfileAction(developerProfileId: string) {
  try {
    await developerProfilesService.copyDeveloperProfile(developerProfileId);
  } catch (error) {
    errorHandler(error);
  }
  revalidatePath("/developer-dashboard/profiles");
}
export async function deleteDeveloperProfileAction(developerProfileId: string) {
  try {
    await developerProfilesService.delete(developerProfileId);
  } catch (error) {
    errorHandler(error);
  }
  revalidatePath("/developer-dashboard/profiles");
}

export async function updateCvAction(background: CvInfo) {
  await developerProfilesService.updateDeveloperProfile(background);
  revalidatePath("/developers");
}

export async function updateProfileCard({
  id,
  title,
  headline,
  name,
}: {
  id: string;
  title: string;
  headline: string;
  name: string;
}) {
  const developerProfileData = {
    id,
    title,
    headline,
    name,
  };

  await developerProfilesService.updateDeveloperProfile(developerProfileData);
  revalidatePath("/developers");
}
