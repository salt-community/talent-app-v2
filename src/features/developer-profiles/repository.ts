import { Db } from "@/db";
import { eq, sql } from "drizzle-orm";
import {
  developerProfileEducations,
  developerProfileLanguages,
  developerProfileSkills,
  meiliSearchOutbox,
  tempDeveloperProfiles,
} from "./db-schema";
import {
  AddDeveloperProfile,
  developerProfileDetails,
  EducationSelect,
  LanguageSelect,
  SkillSelect,
  updateTempDeveloperProfile,
} from "./types";

export function createDevelopersRepository(db: Db) {
  return {
    async getAll() {
      return await db.select().from(tempDeveloperProfiles);
    },
    async getAllById(id: string) {
      const developerId = await db
        .select({ id: tempDeveloperProfiles.id })
        .from(tempDeveloperProfiles)
        .where(eq(tempDeveloperProfiles.identityId, id));
      return developerId;
    },
    async getDeveloperProfileByIdentityId(identityId: string) {
      return await db
        .select()
        .from(tempDeveloperProfiles)
        .where(eq(tempDeveloperProfiles.identityId, identityId));
    },
    async getDeveloperById(id: string) {
      const developerId = await db
        .select({
          name: tempDeveloperProfiles.name,
          id: tempDeveloperProfiles.id,
          identityId: tempDeveloperProfiles.identityId,
          slug: tempDeveloperProfiles.slug,
          email: tempDeveloperProfiles.email,
          status: tempDeveloperProfiles.status,
        })
        .from(tempDeveloperProfiles)
        .where(eq(tempDeveloperProfiles.id, id));
      return developerId[0];
    },
    async getAllDeveloperProfiles() {
      return await db
        .select({
          id: tempDeveloperProfiles.id,
          identityId: tempDeveloperProfiles.identityId,
          name: tempDeveloperProfiles.name,
          avatarUrl: tempDeveloperProfiles.avatarUrl,
          title: tempDeveloperProfiles.title,
          bio: tempDeveloperProfiles.bio,
          links: tempDeveloperProfiles.links,
          status: tempDeveloperProfiles.status,
          skills: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${developerProfileSkills.name})::VARCHAR[]`.as(
            "skills"
          ),
          languages: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${developerProfileLanguages.name})::VARCHAR[]`.as(
            "languages"
          ),
          educations: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${developerProfileEducations.name})::VARCHAR[]`.as(
            "educations"
          ),
        })
        .from(tempDeveloperProfiles)
        .leftJoin(
          developerProfileSkills,
          eq(
            developerProfileSkills.developerProfileId,
            tempDeveloperProfiles.id
          )
        )
        .leftJoin(
          developerProfileLanguages,
          eq(
            developerProfileLanguages.developerProfileId,
            tempDeveloperProfiles.id
          )
        )
        .leftJoin(
          developerProfileEducations,
          eq(
            developerProfileEducations.developerProfileId,
            tempDeveloperProfiles.id
          )
        )
        .groupBy(tempDeveloperProfiles.id);
    },
    async getDeveloperProfileById(developerProfileId: string) {
      return await db
        .select({
          id: tempDeveloperProfiles.id,
          identityId: tempDeveloperProfiles.identityId,
          name: tempDeveloperProfiles.name,
          avatarUrl: tempDeveloperProfiles.avatarUrl,
          title: tempDeveloperProfiles.title,
          bio: tempDeveloperProfiles.bio,
          links: tempDeveloperProfiles.links,
          status: tempDeveloperProfiles.status,
          skills: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${tempDeveloperProfiles.name})::VARCHAR[]`.as(
            "skills"
          ),
          languages: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${tempDeveloperProfiles.name})::VARCHAR[]`.as(
            "languages"
          ),
          educations: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${tempDeveloperProfiles.name})::VARCHAR[]`.as(
            "educations"
          ),
        })
        .from(tempDeveloperProfiles)
        .leftJoin(
          developerProfileSkills,
          eq(
            developerProfileSkills.developerProfileId,
            tempDeveloperProfiles.id
          )
        )
        .leftJoin(
          developerProfileLanguages,
          eq(
            developerProfileLanguages.developerProfileId,
            tempDeveloperProfiles.id
          )
        )
        .leftJoin(
          developerProfileEducations,
          eq(
            developerProfileEducations.developerProfileId,
            tempDeveloperProfiles.id
          )
        )
        .where(eq(tempDeveloperProfiles.id, developerProfileId))
        .groupBy(tempDeveloperProfiles.id);
    },
    async getDeveloperProfile(developerProfileId: string) {
      return await db
        .select({
          id: tempDeveloperProfiles.id,
          identityId: tempDeveloperProfiles.identityId,
          name: tempDeveloperProfiles.name,
          avatarUrl: tempDeveloperProfiles.avatarUrl,
          title: tempDeveloperProfiles.title,
          bio: tempDeveloperProfiles.bio,
          links: tempDeveloperProfiles.links,
          skills: sql<SkillSelect[]>`jsonb_agg(distinct jsonb_build_object(
                'id', ${developerProfileSkills.id},
                'name', ${developerProfileSkills.name},
                'backgroundId', ${developerProfileSkills.backgroundId},
                'developerProfileId', ${developerProfileSkills.developerProfileId},
                'level', ${developerProfileSkills.level}
              ))`.as("skills"),
          languages: sql<
            LanguageSelect[]
          >`jsonb_agg(distinct jsonb_build_object(
                'id', ${developerProfileLanguages.id},
                'name', ${developerProfileLanguages.name},
                'backgroundId', ${developerProfileLanguages.backgroundId},
                'developerProfileId', ${developerProfileSkills.developerProfileId},
                'level', ${developerProfileLanguages.level}
              ))`.as("languages"),
          educations: sql<
            EducationSelect[]
          >`jsonb_agg(distinct jsonb_build_object(
                'id', ${developerProfileEducations.id},
                'name', ${developerProfileEducations.name},
                'backgroundId', ${developerProfileEducations.backgroundId}
                'developerProfileId', ${developerProfileSkills.developerProfileId},
              ))`.as("educations"),
        })
        .from(tempDeveloperProfiles)
        .leftJoin(
          developerProfileSkills,
          eq(
            developerProfileSkills.developerProfileId,
            tempDeveloperProfiles.id
          )
        )
        .leftJoin(
          developerProfileLanguages,
          eq(
            developerProfileLanguages.developerProfileId,
            tempDeveloperProfiles.id
          )
        )
        .leftJoin(
          developerProfileEducations,
          eq(
            developerProfileEducations.developerProfileId,
            tempDeveloperProfiles.id
          )
        )
        .where(eq(tempDeveloperProfiles.id, developerProfileId))
        .groupBy(tempDeveloperProfiles.id);
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
        .from(tempDeveloperProfiles)
        .where(eq(tempDeveloperProfiles.slug, slug));

      return !!developerProfile;
    },
    async insertSlug(id: string, slug: string) {
      await db
        .update(tempDeveloperProfiles)
        .set({
          slug,
        })
        .where(eq(tempDeveloperProfiles.id, id));
    },
    async removeOutboxMessage(id: number) {
      await db.delete(meiliSearchOutbox).where(eq(meiliSearchOutbox.id, id));
    },
    async addDeveloperProfileDetails(
      developerProfileDetails: developerProfileDetails
    ) {
      await db.transaction(async (tx) => {
        for (const skill of developerProfileDetails.skills) {
          await tx.insert(developerProfileSkills).values({
            backgroundId: 1,
            developerProfileId: developerProfileDetails.developerProfileId,
            name: skill,
          });
        }
        for (const language of developerProfileDetails.languages) {
          await tx.insert(developerProfileLanguages).values({
            backgroundId: 1,
            developerProfileId: developerProfileDetails.developerProfileId,
            name: language,
          });
        }
        for (const education of developerProfileDetails.educations) {
          await tx.insert(developerProfileEducations).values({
            backgroundId: 1,
            developerProfileId: developerProfileDetails.developerProfileId,
            name: education,
          });
        }
      });
    },
    async addDeveloperProfile(developerProfile: AddDeveloperProfile) {
      await db
        .insert(tempDeveloperProfiles)
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
          target: tempDeveloperProfiles.id,
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
    async updateDeveloperProfile(developerProfile: updateTempDeveloperProfile) {
      const outboxMessageId = await db.transaction(async (tx) => {
        await tx
          .update(tempDeveloperProfiles)
          .set({
            identityId:
              developerProfile.identityId || tempDeveloperProfiles.identityId,
            name: developerProfile.name || tempDeveloperProfiles.name,
            slug: developerProfile.slug || tempDeveloperProfiles.slug,
            email: developerProfile.email || tempDeveloperProfiles.email,
            status: developerProfile.status || tempDeveloperProfiles.status,
            avatarUrl:
              developerProfile.avatarUrl || tempDeveloperProfiles.avatarUrl,
            title: developerProfile.title || tempDeveloperProfiles.title,
            bio: developerProfile.bio || tempDeveloperProfiles.bio,
            links: developerProfile.links || tempDeveloperProfiles.links,
          })
          .where(eq(tempDeveloperProfiles.id, developerProfile.id));
        if (developerProfile.skills) {
          await tx
            .delete(developerProfileSkills)
            .where(
              eq(developerProfileSkills.developerProfileId, developerProfile.id)
            );
          for (const skill of developerProfile.skills) {
            await tx.insert(developerProfileSkills).values({
              backgroundId: 1,
              developerProfileId: developerProfile.id,
              name: skill,
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
              backgroundId: 1,
              developerProfileId: developerProfile.id,
              name: language,
            });
          }
        }
        if (developerProfile.educations) {
          await tx
            .delete(developerProfileEducations)
            .where(
              eq(
                developerProfileEducations.developerProfileId,
                developerProfile.id
              )
            );
          for (const education of developerProfile.educations) {
            await tx.insert(developerProfileEducations).values({
              backgroundId: 1,
              developerProfileId: developerProfile.id,
              name: education,
            });
          }
        }
        return (
          await tx
            .insert(meiliSearchOutbox)
            .values({
              developerProfileId: developerProfile.id,
              operation: "upsert",
            })
            .returning({ id: meiliSearchOutbox.id })
        )[0].id;
      });
      return { outboxMessageId };
    },
    async deleteTempDeveloperProfile(developerProfileId: string) {
      await db
        .delete(tempDeveloperProfiles)
        .where(eq(tempDeveloperProfiles.id, developerProfileId));
    },
    async deleteTempDeveloperProfileByIdentityId(identityId: string) {
      await db
        .delete(tempDeveloperProfiles)
        .where(eq(tempDeveloperProfiles.identityId, identityId));
    },
  };
}
