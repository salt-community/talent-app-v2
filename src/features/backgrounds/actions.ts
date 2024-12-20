"use server";

import { revalidatePath } from "next/cache";
import { backgroundsService } from "./instance";
import { z } from "zod";
import { redirect } from "next/navigation";

const backgroundUpdate = z.object({
  id: z.coerce.number(),
  devId: z.string().nonempty(),
  name: z.string().nonempty(),
  title: z.string().nonempty(),
  bio: z.string(),
  github: z.string(),
  cv: z.string(),
  skills: z
    .string()
    .transform((val) =>
      JSON.parse(val).map((skill: { text: string }) => skill.text),
    )
    .pipe(z.array(z.string())),
  languages: z
    .string()
    .transform((val) =>
      JSON.parse(val).map((language: { text: string }) => language.text),
    )
    .pipe(z.array(z.string())),

  educations: z
    .string()
    .transform((val) =>
      JSON.parse(val).map((education: { text: string }) => education.text),
    )
    .pipe(z.array(z.string())),
});

export async function updateBackgroundAction(
  _: void | null | string,
  formData: FormData,
) {
  const update = Object.fromEntries(formData.entries());
  const validatedUpdate = backgroundUpdate.parse(update);
  const links: SocialLink[] = [
    { name: "Github", url: validatedUpdate.github },
    { name: "Resume", url: validatedUpdate.cv },
  ];
  await backgroundsService.update({ ...validatedUpdate, links });

  revalidatePath("/");
  redirect(`/developers/${validatedUpdate.devId}`);
}
