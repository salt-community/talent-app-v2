import type { AssignmentFormData, AssignmentScoreFormData } from "./types";

export const getFormData = (formData: FormData): AssignmentFormData => {
  const title = formData.get("title") as string | null;
  const cohortId = formData.get("cohortId") as string | null;
  const comment = formData.get("comment") as string | null;
  const categories = (formData.get("categories") as string)?.split(",") || [];
  const tags = (formData.get("tags") as string)?.split(",") || [];

  if (!title || !cohortId) {
    throw new Error("Missing required fields: title or cohortId");
  }

  return {
    title,
    cohortId,
    comment: comment || undefined,
    categories,
    tags,
  };
};

export const getAssignmentScoreFormData = (
  formData: FormData
): AssignmentScoreFormData => {
  const assignmentId = formData.get("assignmentId") as string | null;
  const identityId = formData.get("identityId") as string | null;
  const score = formData.get("score") as string | null;
  const comment = formData.get("comment") as string | null;

  if (!assignmentId || !identityId || !score) {
    throw new Error(
      "Missing required fields: assignmentId, identityId, or score"
    );
  }

  return {
    assignmentId,
    identityId,
    score,
    comment: comment || undefined,
  };
};
