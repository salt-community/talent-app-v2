import { Db } from "@/db";
import { eq, sql } from "drizzle-orm";
import {
  developerProfileEducations,
  developerProfileJobs,
  developerProfileLanguages,
  developerProfiles,
  developerProfileSkills,
  meiliSearchOutbox,
  newDeveloperProfileEducations,
} from "./db-schema";
import {
  AddDeveloperProfile,
  developerProfileDetails,
  LanguageSelect,
  SkillSelect,
  updateDeveloperProfile,
} from "./types";
import { Experience } from "./components/cv/cv-main-content";

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
          headline: developerProfiles.headline,
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
    async getAllDeveloperProfiles() {
      return await db
        .select({
          id: developerProfiles.id,
          identityId: developerProfiles.identityId,
          name: developerProfiles.name,
          avatarUrl: developerProfiles.avatarUrl,
          title: developerProfiles.title,
          bio: developerProfiles.bio,
          links: developerProfiles.links,
          status: developerProfiles.status,
          headline: developerProfiles.headline,
          skills: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${developerProfileSkills.name})::VARCHAR[]`.as(
            "skills",
          ),
          languages: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${developerProfileLanguages.name})::VARCHAR[]`.as(
            "languages",
          ),
          educations: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${developerProfileEducations.name})::VARCHAR[]`.as(
            "educations",
          ),
        })
        .from(developerProfiles)
        .leftJoin(
          developerProfileSkills,
          eq(developerProfileSkills.developerProfileId, developerProfiles.id),
        )
        .leftJoin(
          developerProfileLanguages,
          eq(
            developerProfileLanguages.developerProfileId,
            developerProfiles.id,
          ),
        )
        .leftJoin(
          developerProfileEducations,
          eq(
            developerProfileEducations.developerProfileId,
            developerProfiles.id,
          ),
        )
        .groupBy(developerProfiles.id);
    },
    async getDeveloperProfileById(developerProfileId: string) {
      return await db
        .select({
          id: developerProfiles.id,
          identityId: developerProfiles.identityId,
          name: developerProfiles.name,
          avatarUrl: developerProfiles.avatarUrl,
          title: developerProfiles.title,
          bio: developerProfiles.bio,
          links: developerProfiles.links,
          status: developerProfiles.status,
          headline: developerProfiles.headline,
          skills: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${developerProfiles.name})::VARCHAR[]`.as(
            "skills",
          ),
          languages: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${developerProfiles.name})::VARCHAR[]`.as(
            "languages",
          ),
          educations: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${developerProfiles.name})::VARCHAR[]`.as(
            "educations",
          ),
        })
        .from(developerProfiles)
        .leftJoin(
          developerProfileSkills,
          eq(developerProfileSkills.developerProfileId, developerProfiles.id),
        )
        .leftJoin(
          developerProfileLanguages,
          eq(
            developerProfileLanguages.developerProfileId,
            developerProfiles.id,
          ),
        )
        .leftJoin(
          developerProfileEducations,
          eq(
            developerProfileEducations.developerProfileId,
            developerProfiles.id,
          ),
        )
        .where(eq(developerProfiles.id, developerProfileId))
        .groupBy(developerProfiles.id);
    },
    async getDeveloperProfile(developerProfileId: string) {
      const result = await db
        .select({
          id: developerProfiles.id,
          identityId: developerProfiles.identityId,
          name: developerProfiles.name,
          avatarUrl: developerProfiles.avatarUrl,
          title: developerProfiles.title,
          bio: developerProfiles.bio,
          links: developerProfiles.links,
          headline: developerProfiles.headline,
          skills: sql<
            SkillSelect[]
          >`COALESCE(jsonb_agg(DISTINCT jsonb_build_object(
                'id', ${developerProfileSkills.id},
                'name', ${developerProfileSkills.name},
                'level', ${developerProfileSkills.level}
              )) FILTER (WHERE ${developerProfileSkills.id} IS NOT NULL), '[]'::jsonb)`.as(
            "skills",
          ),
          languages: sql<
            LanguageSelect[]
          >`COALESCE(jsonb_agg(DISTINCT jsonb_build_object(
                'id', ${developerProfileLanguages.id},
                'name', ${developerProfileLanguages.name},
                'level', ${developerProfileLanguages.level}
              )) FILTER (WHERE ${developerProfileLanguages.id} IS NOT NULL), '[]'::jsonb)`.as(
            "languages",
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
            "educations",
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
            "jobs",
          ),
        })
        .from(developerProfiles)
        .leftJoin(
          developerProfileSkills,
          eq(developerProfileSkills.developerProfileId, developerProfiles.id),
        )
        .leftJoin(
          developerProfileLanguages,
          eq(
            developerProfileLanguages.developerProfileId,
            developerProfiles.id,
          ),
        )
        .leftJoin(
          newDeveloperProfileEducations,
          eq(
            newDeveloperProfileEducations.developerProfileId,
            developerProfiles.id,
          ),
        )
        .leftJoin(
          developerProfileJobs,
          eq(developerProfileJobs.developerProfileId, developerProfiles.id),
        )
        .where(eq(developerProfiles.id, developerProfileId))
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
      return await db.select().from(meiliSearchOutbox);
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
      await db.delete(meiliSearchOutbox).where(eq(meiliSearchOutbox.id, id));
    },
    async addDeveloperProfileDetails(
      developerProfileDetails: developerProfileDetails,
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
      await db
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
          headline: developerProfile.headline || "",
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
        });
    },
    async updateDeveloperProfile(
      updatedDeveloperProfile: updateDeveloperProfile,
    ) {
      const outboxMessageId = await db.transaction(async (tx) => {
        await tx
          .update(developerProfiles)
          .set({
            identityId:
              updatedDeveloperProfile.identityId ||
              developerProfiles.identityId,
            name: updatedDeveloperProfile.name || developerProfiles.name,
            slug: updatedDeveloperProfile.slug || developerProfiles.slug,
            email: updatedDeveloperProfile.email || developerProfiles.email,
            status: updatedDeveloperProfile.status || developerProfiles.status,
            avatarUrl:
              updatedDeveloperProfile.avatarUrl || developerProfiles.avatarUrl,
            title: updatedDeveloperProfile.title || developerProfiles.title,
            bio: updatedDeveloperProfile.bio || developerProfiles.bio,
            links: updatedDeveloperProfile.links || developerProfiles.links,
            headline:
              updatedDeveloperProfile.headline || developerProfiles.headline,
          })
          .where(eq(developerProfiles.id, updatedDeveloperProfile.id));

        if (updatedDeveloperProfile.skills) {
          await tx
            .delete(developerProfileSkills)
            .where(
              eq(
                developerProfileSkills.developerProfileId,
                updatedDeveloperProfile.id,
              ),
            );
          for (const skill of updatedDeveloperProfile.skills) {
            await tx.insert(developerProfileSkills).values({
              developerProfileId: updatedDeveloperProfile.id,
              name: skill,
            });
          }
        }
        if (updatedDeveloperProfile.languages) {
          await tx
            .delete(developerProfileLanguages)
            .where(
              eq(
                developerProfileLanguages.developerProfileId,
                updatedDeveloperProfile.id,
              ),
            );
          for (const language of updatedDeveloperProfile.languages) {
            await tx.insert(developerProfileLanguages).values({
              developerProfileId: updatedDeveloperProfile.id,
              name: language,
            });
          }
        }
        if (updatedDeveloperProfile.educations) {
          await tx
            .delete(newDeveloperProfileEducations)
            .where(
              eq(
                newDeveloperProfileEducations.developerProfileId,
                updatedDeveloperProfile.id,
              ),
            );
          for (const education of updatedDeveloperProfile.educations) {
            await tx.insert(newDeveloperProfileEducations).values({
              developerProfileId: updatedDeveloperProfile.id,
              organization: education.organization,
              date: education.date,
              role: education.role,
              description: education.description,
            });
          }
        }
        if (updatedDeveloperProfile.jobs) {
          await tx
            .delete(developerProfileJobs)
            .where(
              eq(
                developerProfileJobs.developerProfileId,
                updatedDeveloperProfile.id,
              ),
            );
          for (const job of updatedDeveloperProfile.jobs) {
            await tx.insert(developerProfileJobs).values({
              developerProfileId: updatedDeveloperProfile.id,
              organization: job.organization,
              date: job.date,
              role: job.role,
              description: job.description,
            });
          }
        }
        return (
          await tx
            .insert(meiliSearchOutbox)
            .values({
              developerProfileId: updatedDeveloperProfile.id,
              operation: "upsert",
            })
            .returning({ id: meiliSearchOutbox.id })
        )[0].id;
      });
      return { outboxMessageId };
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
