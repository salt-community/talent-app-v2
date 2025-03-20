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

export async function updateCvAction(backgrounds: CvInfo) {
  const background = {
    id: backgrounds.id,
    name: backgrounds.name,
    bio: backgrounds.bio,
    avatarUrl: backgrounds.avatarUrl,
    skills: backgrounds.skills.map((skill) => skill.name),
    languages: backgrounds.languages.map((language) => language.name),
    links: backgrounds.links,
    jobs: backgrounds.jobs,
    educations: backgrounds.educations,
    title: backgrounds.title,
    headline: backgrounds.headline,
  };

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
