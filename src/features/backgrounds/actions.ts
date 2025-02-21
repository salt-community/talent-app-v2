"use server";

import { errorHandler } from "@/lib";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { backgroundsService } from "./instance";
import { PreviousState, SocialLink } from "./types";
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
