export const getFormData = (formData: FormData) => {
  const title = formData.get("title") as string;
  const comment = formData.get("comment") as string;
  const score = formData.get("score") as string;

  const tags: string[] = [];  

  if (formData.get("conversation") as string) tags.push("conversation");
  if (formData.get("teamCollaboration") as string) tags.push("teamCollaboration");
  if (formData.get("management") as string) tags.push("management");
  if (formData.get("design") as string) tags.push("design");
  if (formData.get("backend") as string) tags.push("backend");
  if (formData.get("frontend") as string) tags.push("frontend");

  return {
    title,
    comment,
    score,
    tags
  };
}
