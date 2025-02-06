"use server";

import { errorHandler } from "@/lib";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z, ZodError } from "zod";
import { SocialLink } from "./db";
import { backgroundsService } from "./instance";

const backgroundUpdate = z.object({
  id: z.coerce.number(),
  devId: z.string().nonempty(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  name: z.string().nonempty("Name must contain at least 1 character(s)"),
  title: z
    .string()
    .nonempty("Role must contain at least 1 character(s)")
    .optional(),
  bio: z.string().optional(),
  github: z.string().optional(),
  cv: z.string().optional(),
  skills: z
    .string()
    .transform((val) =>
      JSON.parse(val).map((skill: { text: string }) => skill.text)
    )
    .pipe(z.array(z.string())),
  languages: z
    .string()
    .transform((val) =>
      JSON.parse(val).map((language: { text: string }) => language.text)
    )
    .pipe(z.array(z.string())),

  educations: z
    .string()
    .transform((val) =>
      JSON.parse(val).map((education: { text: string }) => education.text)
    )
    .pipe(z.array(z.string())),
});

type BackgroundUpdate = z.infer<typeof backgroundUpdate>;

type PreviousState =
  | {
      errorMessages: {
        avatarUrlError?: string;
        nameError?: string;
        titleError?: string;
      };
      update: {
        [k: string]: FormDataEntryValue;
      };
    }
  | undefined;

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
    redirect(`/developers/${validatedUpdate.devId}`);
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
