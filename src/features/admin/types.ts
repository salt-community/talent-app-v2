export const developersStatus = [
  "published",
  "unpublished",
  "highlighted",
] as const;

export type DevelopersStatus = (typeof developersStatus)[number];
