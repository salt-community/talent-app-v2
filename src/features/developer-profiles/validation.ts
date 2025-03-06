import { z } from "zod";

export const developerProfileUpdate = z.object({
  id: z.string().nonempty(),
  identityId: z.string().nonempty(),
  name: z.string().nonempty("Name must contain at least 1 character(s)"),
  avatarUrl: z.string().url().optional().or(z.literal("")),
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

export const CVHeaderUpdate = z.object({
  id: z.string().nonempty(),
  identityId: z.string().nonempty(),
  name: z.string().nonempty("Name must contain at least 1 character(s)"),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  bio: z.string().optional(),
});

export type DeveloperProfileValidation = z.infer<typeof developerProfileUpdate>;
export type CVHeaderValidation = z.infer<typeof CVHeaderUpdate>;
