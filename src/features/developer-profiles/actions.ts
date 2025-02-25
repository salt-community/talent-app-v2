"use server";

import { errorHandler } from "@/lib";
import { revalidatePath } from "next/cache";
import { developerProfilesService } from "./instance";
import { BackgroundUpdate, backgroundUpdate } from "./backgrounds/validation";
import { ZodError } from "zod";
import { PreviousState, SocialLink } from "./types";

export async function addDeveloperProfileAction(identityId: string) {
  try {
    await developerProfilesService.createDeveloperProfile(identityId);
  } catch (error) {
    errorHandler(error);
  }
  revalidatePath("/profile");
}

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
    await developerProfilesService.updateBackground({
      ...validatedUpdate,
      links,
    });
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
