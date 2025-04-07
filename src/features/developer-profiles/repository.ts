import { Db } from "@/db";
import { eq, inArray, sql } from "drizzle-orm";
import {
  developerProfileEducations,
  developerProfileJobs,
  developerProfileLanguages,
  developerProfiles,
  developerProfileSkills,
  searchOutbox,
  newDeveloperProfileEducations,
} from "./db-schema";
import {
  AddDeveloperProfile,
  CopyDeveloperProfile,
  developerProfileDetails,
  DeveloperProfileDetailsUpdate,
  LanguageSelect,
  SkillSelect,
} from "./types";
import { Experience } from "./components/cv/cv-main-content";
import { v4 as uuidv4 } from "uuid";

export function createDevelopersRepository(db: Db) {
  return {
    async getAll() {
      return await db
        .select({
          id: developerProfiles.id,
          identityId: developerProfiles.identityId,
          name: developerProfiles.name,
          slug: developerProfiles.slug,
          email: developerProfiles.email,
          status: developerProfiles.status,
          avatarUrl: developerProfiles.avatarUrl,
          title: developerProfiles.title,
          links: developerProfiles.links,
          bio: developerProfiles.bio,
        })
        .from(developerProfiles);
    },
    async getAllDeveloperProfileIdsByIdentityId(id: string) {
      const developerId = await db
        .select({ id: developerProfiles.id })
        .from(developerProfiles)
        .where(eq(developerProfiles.identityId, id))
        .orderBy(developerProfiles.slug);
      return developerId;
    },
    async getDeveloperProfileByIdentityId(identityId: string) {
      return await db
        .select({
          id: developerProfiles.id,
          slug: developerProfiles.slug,
        })
        .from(developerProfiles)
        .where(eq(developerProfiles.identityId, identityId));
    },
    async getDeveloperById(id: string) {
      const developerId = await db
        .select({
          name: developerProfiles.name,
          id: developerProfiles.id,
          identityId: developerProfiles.identityId,
          slug: developerProfiles.slug,
          email: developerProfiles.email,
          status: developerProfiles.status,
        })
        .from(developerProfiles)
        .where(eq(developerProfiles.id, id));
      return developerId[0];
    },
    async getDeveloperProfiles(developerProfileIds?: string[]) {
      const result = await db
        .select({
          id: developerProfiles.id,
          identityId: developerProfiles.identityId,
          email: developerProfiles.email,
          slug: developerProfiles.slug,
          name: developerProfiles.name,
          avatarUrl: developerProfiles.avatarUrl,
          title: developerProfiles.title,
          bio: developerProfiles.bio,
          links: developerProfiles.links,
          status: developerProfiles.status,
          headerLanguage: developerProfiles.headerLanguage,
          skills: sql<
            SkillSelect[]
          >`COALESCE(jsonb_agg(DISTINCT jsonb_build_object(
                'id', ${developerProfileSkills.id},
                'name', ${developerProfileSkills.name},
                'level', ${developerProfileSkills.level}
              )) FILTER (WHERE ${developerProfileSkills.id} IS NOT NULL), '[]'::jsonb)`.as(
            "skills"
          ),
          languages: sql<
            LanguageSelect[]
          >`COALESCE(jsonb_agg(DISTINCT jsonb_build_object(
                'id', ${developerProfileLanguages.id},
                'name', ${developerProfileLanguages.name},
                'level', ${developerProfileLanguages.level}
              )) FILTER (WHERE ${developerProfileLanguages.id} IS NOT NULL), '[]'::jsonb)`.as(
            "languages"
          ),
          educations: sql<
            Experience[]
          >`COALESCE(jsonb_agg(DISTINCT jsonb_build_object(
                'id', ${newDeveloperProfileEducations.id},
                'organization', ${newDeveloperProfileEducations.organization},
                'date', ${newDeveloperProfileEducations.date},
                'role', ${newDeveloperProfileEducations.role},
                'description', ${newDeveloperProfileEducations.description}
              )) FILTER (WHERE ${newDeveloperProfileEducations.id} IS NOT NULL), '[]'::jsonb)`.as(
            "educations"
          ),
          jobs: sql<
            Experience[]
          >`COALESCE(jsonb_agg(DISTINCT jsonb_build_object(
                'id', ${developerProfileJobs.id},
                'organization', ${developerProfileJobs.organization},
                'date', ${developerProfileJobs.date},
                'role', ${developerProfileJobs.role},
                'description', ${developerProfileJobs.description}
              )) FILTER (WHERE ${developerProfileJobs.id} IS NOT NULL), '[]'::jsonb)`.as(
            "jobs"
          ),
        })
        .from(developerProfiles)
        .leftJoin(
          developerProfileSkills,
          eq(developerProfileSkills.developerProfileId, developerProfiles.id)
        )
        .leftJoin(
          developerProfileLanguages,
          eq(developerProfileLanguages.developerProfileId, developerProfiles.id)
        )
        .leftJoin(
          newDeveloperProfileEducations,
          eq(
            newDeveloperProfileEducations.developerProfileId,
            developerProfiles.id
          )
        )
        .leftJoin(
          developerProfileJobs,
          eq(developerProfileJobs.developerProfileId, developerProfiles.id)
        )
        .where(developerProfileIds ? inArray(developerProfiles.id, developerProfileIds) : undefined)
        .groupBy(developerProfiles.id);

      return result;
    },
    async getAllSkills() {
      return await db.select().from(developerProfileSkills);
    },
    async getAllLanguages() {
      return await db.select().from(developerProfileLanguages);
    },
    async getAllEducations() {
      return await db.select().from(developerProfileEducations);
    },
    async getAllOutboxMessage() {
      return await db.select().from(searchOutbox);
    },
    async existsBySlug(slug: string) {
      const [developerProfile] = await db
        .select()
        .from(developerProfiles)
        .where(eq(developerProfiles.slug, slug));

      return !!developerProfile;
    },
    async insertSlug(id: string, slug: string) {
      await db
        .update(developerProfiles)
        .set({
          slug,
        })
        .where(eq(developerProfiles.id, id));
    },
    async removeOutboxMessage(id: number) {
      await db.delete(searchOutbox).where(eq(searchOutbox.id, id));
    },
    async addDeveloperProfileDetails(
      developerProfileDetails: developerProfileDetails
    ) {
      await db.transaction(async (tx) => {
        for (const skill of developerProfileDetails.skills) {
          await tx.insert(developerProfileSkills).values({
            developerProfileId: developerProfileDetails.id,
            name: skill,
          });
        }
        for (const language of developerProfileDetails.languages) {
          await tx.insert(developerProfileLanguages).values({
            developerProfileId: developerProfileDetails.id,
            name: language,
          });
        }
        for (const education of developerProfileDetails.educations) {
          await tx.insert(developerProfileEducations).values({
            developerProfileId: developerProfileDetails.id,
            name: education,
          });
        }
      });
    },
    async addDeveloperProfile(developerProfile: AddDeveloperProfile) {
      const outboxMessage = await db.transaction(async (tx) => {
        const developerProfileId = (
          await tx
            .insert(developerProfiles)
            .values({
              id: developerProfile.id,
              identityId: developerProfile.identityId,
              name: developerProfile.name,
              slug: developerProfile.slug,
              email: developerProfile.email,
              status: developerProfile.status || "",
              avatarUrl: developerProfile.avatarUrl || "",
              title: developerProfile.title || "",
              bio: developerProfile.bio || "",
              links: developerProfile.links || [],
            })
            .onConflictDoUpdate({
              target: developerProfiles.id,
              set: {
                identityId: developerProfile.identityId,
                name: developerProfile.name,
                slug: developerProfile.slug,
                email: developerProfile.email,
                status: developerProfile.status || "",
                avatarUrl: developerProfile.avatarUrl || "",
                title: developerProfile.title || "",
                bio: developerProfile.bio || "",
                links: developerProfile.links || [],
              },
            })
            .returning({ id: developerProfiles.id })
        )[0].id;

        return (
          await tx
            .insert(searchOutbox)
            .values({
              developerProfileId: developerProfileId,
              operation: "upsert",
            })
            .returning()
        )[0];
      });
      return outboxMessage;
    },
    async updateDeveloperProfileDetails(
      developerProfile: DeveloperProfileDetailsUpdate
    ) {
      const outboxMessage = await db.transaction(async (tx) => {
        await tx
          .update(developerProfiles)
          .set({
            identityId:
              developerProfile.identityId || developerProfiles.identityId,
            name: developerProfile.name || developerProfiles.name,
            slug: developerProfile.slug || developerProfiles.slug,
            email: developerProfile.email || developerProfiles.email,
            status: developerProfile.status || developerProfiles.status,
            avatarUrl:
              developerProfile.avatarUrl || developerProfiles.avatarUrl,
            title: developerProfile.title || developerProfiles.title,
            bio: developerProfile.bio || developerProfiles.bio,
            links: developerProfile.links || developerProfiles.links,
            headerLanguage:
              developerProfile.headerLanguage ||
              developerProfiles.headerLanguage,
          })
          .where(eq(developerProfiles.id, developerProfile.id));

        if (developerProfile.skills) {
          await tx
            .delete(developerProfileSkills)
            .where(
              eq(developerProfileSkills.developerProfileId, developerProfile.id)
            );
          for (const skill of developerProfile.skills) {
            await tx.insert(developerProfileSkills).values({
              developerProfileId: developerProfile.id,
              name: skill.name,
            });
          }
        }
        if (developerProfile.languages) {
          await tx
            .delete(developerProfileLanguages)
            .where(
              eq(
                developerProfileLanguages.developerProfileId,
                developerProfile.id
              )
            );
          for (const language of developerProfile.languages) {
            await tx.insert(developerProfileLanguages).values({
              developerProfileId: developerProfile.id,
              name: language.name,
            });
          }
        }
        if (developerProfile.educations) {
          await tx
            .delete(newDeveloperProfileEducations)
            .where(
              eq(
                newDeveloperProfileEducations.developerProfileId,
                developerProfile.id
              )
            );
          for (const education of developerProfile.educations) {
            await tx.insert(newDeveloperProfileEducations).values({
              developerProfileId: developerProfile.id,
              organization: education.organization,
              date: education.date,
              role: education.role,
              description: education.description,
            });
          }
        }
        if (developerProfile.jobs) {
          await tx
            .delete(developerProfileJobs)
            .where(
              eq(developerProfileJobs.developerProfileId, developerProfile.id)
            );
          for (const job of developerProfile.jobs) {
            await tx.insert(developerProfileJobs).values({
              developerProfileId: developerProfile.id,
              organization: job.organization,
              date: job.date,
              role: job.role,
              description: job.description,
            });
          }
        }
        return (
          await tx
            .insert(searchOutbox)
            .values({
              developerProfileId: developerProfile.id,
              operation: "upsert",
            })
            .returning()
        )[0];
      });
      return outboxMessage;
    },
    async copyDeveloperProfile(developerProfile: CopyDeveloperProfile) {
      const newDeveloperProfileId = uuidv4();
      const outboxMessage = await db.transaction(async (tx) => {
        await tx.insert(developerProfiles).values({
          id: newDeveloperProfileId,
          identityId: developerProfile.identityId,
          name: developerProfile.name,
          slug: developerProfile.slug || "",
          email: developerProfile.email || "",
          status: "unpublished",
          avatarUrl: developerProfile.avatarUrl || "",
          title: developerProfile.title || "",
          bio: developerProfile.bio || "",
          links: developerProfile.links || [],
          headerLanguage: developerProfile.headerLanguage,
        });
        if (developerProfile.skills) {
          for (const skill of developerProfile.skills) {
            await tx.insert(developerProfileSkills).values({
              developerProfileId: newDeveloperProfileId,
              name: skill.name,
            });
          }
        }
        if (developerProfile.languages) {
          for (const language of developerProfile.languages) {
            await tx.insert(developerProfileLanguages).values({
              developerProfileId: newDeveloperProfileId,
              name: language.name,
            });
          }
        }
        if (developerProfile.educations) {
          for (const education of developerProfile.educations) {
            await tx.insert(newDeveloperProfileEducations).values({
              developerProfileId: newDeveloperProfileId,
              organization: education.organization,
              date: education.date,
              role: education.role,
              description: education.description,
            });
          }
        }
        if (developerProfile.jobs) {
          for (const job of developerProfile.jobs) {
            await tx.insert(developerProfileJobs).values({
              developerProfileId: newDeveloperProfileId,
              organization: job.organization,
              date: job.date,
              role: job.role,
              description: job.description,
            });
          }
        }
        return (
          await tx
            .insert(searchOutbox)
            .values({
              developerProfileId: newDeveloperProfileId,
              operation: "upsert",
            })
            .returning()
        )[0];
      });
      return outboxMessage;
    },
    async deleteDeveloperProfile(developerProfileId: string) {
      await db
        .delete(developerProfiles)
        .where(eq(developerProfiles.id, developerProfileId));
    },
    async deleteDeveloperProfileByIdentityId(identityId: string) {
      await db
        .delete(developerProfiles)
        .where(eq(developerProfiles.identityId, identityId));
    },
  };
}
