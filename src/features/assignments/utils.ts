import type { AssignmentFormData } from "./types";

export const getAssignmentFormData = (
  formData: FormData
): AssignmentFormData => {
  const title = formData.get("title") as string | null;
  const cohortId = formData.get("cohortId") as string | null;
  const comment = formData.get("comment") as string | null;
  const developerProfileId = formData.get("devId") as string | null;
  const score = formData.get("score") as number | null;
  const categories = (formData.get("categories") as string)?.split(",") || [];
  const tags = (formData.get("tags") as string)?.split(",") || [];

  if (!title || !cohortId) {
    throw new Error("Missing required fields: title or cohortId");
  }

  return {
    developerProfileId: developerProfileId ?? undefined,
    score: score?.toString() ?? "",
    tags,
    title,
    cohortId,
    comment: comment,
    categories,
  };
};
