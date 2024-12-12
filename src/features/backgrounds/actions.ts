"use server";

import { revalidatePath } from "next/cache";
import { backgroundsService } from "./instance";

export async function addBackgroundAction(formData: FormData) {
  const name = formData.get("name") as string;
  const title = formData.get("title") as string;
  const bio = formData.get("bio") as string;
  await backgroundsService.add({
    name,
    title,
    bio,
    languages: [],
    educations: [],
    skills: [],
    links: [],
  });
}

export async function updateBackgroundAction(formData: FormData) {
  const id = Number(formData.get("userId"));
  const name = formData.get("name") as string;
  const title = formData.get("title") as string;
  const bio = formData.get("bio") as string;
  const skillsSerialized = formData.get("skillsSerialized") as string;
  const skills = JSON.parse(skillsSerialized);
  console.log(skills);
  await backgroundsService.update({
    id,
    name,
    title,
    bio,
    skills,
  });
  revalidatePath("/");
}
