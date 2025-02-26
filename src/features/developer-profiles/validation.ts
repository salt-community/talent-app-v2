import { z } from "zod";

export const backgroundUpdate = z.object({
  id: z.coerce.number(),
  developerProfileId: z.string().nonempty(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  name: z.string().nonempty("Name must contain at least 1 character(s)"),
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

export type BackgroundUpdate = z.infer<typeof backgroundUpdate>;
