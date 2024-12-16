"use server";

import { revalidatePath } from "next/cache";
import { backgroundsService } from "./instance";

export async function updateBackgroundAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const title = formData.get("title") as string;
  const bio = formData.get("bio") as string;
  const skills = JSON.parse(formData.get("skills") as string);
  const languages = JSON.parse(formData.get("languages") as string);
  const educations = JSON.parse(formData.get("educations") as string);

  await backgroundsService.update({
    id,
    name,
    title,
    bio,
    skills,
    languages,
    educations,
  });
  revalidatePath("/");
}
