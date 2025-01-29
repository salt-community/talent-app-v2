export const getCohortFormData = (formData: FormData) => {
  return {
    name: formData.get("name") as string,
    description: formData.get("description") as string | null,
    status: (formData.get("status") as string) ?? "planned",
    identityId: (formData.get("identityId") as string) ?? "1",
  };
};
