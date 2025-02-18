"use server";

import { errorHandler } from "@/lib";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { SocialLink } from "./db";
import { backgroundsService } from "./instance";
import { PreviousState } from "./types";
import { backgroundUpdate, BackgroundUpdate } from "./validation";

export async function updateBackgroundAction(
  _: PreviousState,
  formData: FormData
) {
  const update = Object.fromEntries(formData.entries());
  let validatedUpdate: BackgroundUpdate | undefined;

  try {
    validatedUpdate = backgroundUpdate.parse(update);
    const links: SocialLink[] = [
      { name: "Github", url: validatedUpdate.github || "" },
      { name: "Resume", url: validatedUpdate.cv || "" },
    ];
    await backgroundsService.update({ ...validatedUpdate, links });
  } catch (error) {
    if (error instanceof ZodError) {
      const avatarUrlError = error.flatten().fieldErrors.avatarUrl?.[0];
      const nameError = error.flatten().fieldErrors.name?.[0];
      const titleError = error.flatten().fieldErrors.title?.[0];

      return {
        errorMessages: {
          avatarUrlError,
          nameError,
          titleError,
        },
        update,
      };
    }
    errorHandler(error);
  }

  if (validatedUpdate) {
    revalidatePath("/");
  }
}
export async function addBackground(id: string) {
  const developer = await backgroundsService.addDeveloperBackground(id);
  return developer;
}
export async function addDeveloperProfileAction(identityId: string) {
  try {
    await backgroundsService.createDeveloperProfile(identityId);
  } catch (error) {
    errorHandler(error);
  }
  revalidatePath("/profile");
}

export async function deleteDeveloperProfileAction(developerProfileId: string) {
  try {
    await backgroundsService.deleteDeveloperProfile(developerProfileId);
  } catch (error) {
    errorHandler(error);
  }
  revalidatePath("/profile");
}

export async function getDeveloperProfilesAction(identityId: string) {
  try {
    const profiles =
      await backgroundsService.getAllDeveloperProfilesById(identityId);
    return profiles;
  } catch (error) {
    errorHandler(error);
  }
}
