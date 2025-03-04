import { AssignmentFormData } from "@/features/assignments";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function toCamelCase(str: string): string {
  return str
    .split(" ")
    .filter((word) => word.trim() !== "")
    .map((word, i) =>
      i === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
}
export function getFormData(formData: FormData): AssignmentFormData {
  const developerProfileId = formData.get("devId") as string | null;
  const title = formData.get("title") as string | null;
  const score = formData.get("score") as string | null;
  const comment = formData.get("comment") as string | null;
  const tagsString = formData.get("tags") as string | null;
  const cohort = formData.get("cohort") as string | null;
  const description = formData.get("description") as string | null;

  return {
    developerProfileId: developerProfileId ?? undefined,
    title: title ?? "",
    tags: tagsString ? tagsString.split(",") : [],
    score: score ?? "",
    cohortId: cohort ?? "",
    comment: comment ?? "",
    categories: description ? description.split(",") : [],
  };
}
