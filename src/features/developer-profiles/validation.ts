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

export const CvInfoSchema = z.object({
  id: z.string(),
  identityId: z.string(),
  name: z.string(),
  avatarUrl: z.string().url(),
  title: z.string(),
  bio: z.string().nullable(),
  links: z.array(
    z.object({
      url: z.string(),
      name: z.string(),
    })
  ),
  skills: z.array(  
    z.object({
      name: z.string(),
    })
  ),
  languages: z.array(
    z.object({
      name: z.string(),
    })
  ),
  educations: z.array(
    z.object({
      id: z.string(),
      organization: z.string(),
      date: z.string(),
      role: z.string(),
      description: z.string(),
    })
  ),
  jobs: z.array(
    z.object({
      id: z.string(),
      organization: z.string(),
      date: z.string(),
      role: z.string(),
      description: z.string(),
    })
  ),
  status: z.string(),
  headerLanguage: z.string().nullable(),
});


export type DeveloperProfileValidation = z.infer<typeof developerProfileUpdate>;
export type CVHeaderValidation = z.infer<typeof CVHeaderUpdate>;
export type CVInfoValidation = z.infer<typeof CvInfoSchema>;
