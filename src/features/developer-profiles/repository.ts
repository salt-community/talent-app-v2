import { Db } from "@/db";
import { eq, sql } from "drizzle-orm";
import {
  developerProfileBackgrounds,
  developerProfileEducations,
  developerProfileLanguages,
  developerProfiles,
  developerProfileSkills,
  meiliSearchOutbox,
  tempDeveloperProfiles,
} from "./db-schema";
import {
  BackgroundForDeveloperProfile,
  BackgroundInsert,
  BackgroundUpdate,
  DeveloperProfileInsert,
  EducationSelect,
  LanguageSelect,
  SkillSelect,
  updateTempDeveloperProfile,
} from "./types";
import { DeveloperProfileValidation } from "./validation";

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
    async getAllBackgrounds() {
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
    async getBackgroundByDeveloperProfileId(developerProfileId: string) {
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
    async getBackgroundById(developerProfileId: string) {
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
                'level', ${developerProfileSkills.level}
              ))`.as("skills"),
          languages: sql<
            LanguageSelect[]
          >`jsonb_agg(distinct jsonb_build_object(
                'id', ${developerProfileLanguages.id},
                'name', ${developerProfileLanguages.name},
                'backgroundId', ${developerProfileLanguages.backgroundId},
                'level', ${developerProfileLanguages.level}
              ))`.as("languages"),
          educations: sql<
            EducationSelect[]
          >`jsonb_agg(distinct jsonb_build_object(
                'id', ${developerProfileEducations.id},
                'name', ${developerProfileEducations.name},
                'backgroundId', ${developerProfileEducations.backgroundId}
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
    async addDeveloperProfileDetails(background: BackgroundInsert) {
      await db.transaction(async (tx) => {
        for (const skill of background.skills) {
          await tx.insert(developerProfileSkills).values({
            backgroundId: 1,
            developerProfileId: background.developerProfileId,
            name: skill,
          });
        }
        for (const language of background.languages) {
          await tx.insert(developerProfileLanguages).values({
            backgroundId: 1,
            developerProfileId: background.developerProfileId,
            name: language,
          });
        }
        for (const education of background.educations) {
          await tx.insert(developerProfileEducations).values({
            backgroundId: 1,
            developerProfileId: background.developerProfileId,
            name: education,
          });
        }
      });
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
    async addTempDeveloperProfile(
      developerProfile: DeveloperProfileInsert,
      background: BackgroundForDeveloperProfile
    ) {
      let id: string;
      if (developerProfile.id) {
        id = developerProfile.id;
      } else {
        id = background.developerProfileId;
      }
      await db
        .insert(tempDeveloperProfiles)
        .values({
          id: id,
          identityId: developerProfile.identityId,
          name: developerProfile.name,
          slug: developerProfile.slug,
          email: developerProfile.email,
          status: developerProfile.status,
          avatarUrl: background.avatarUrl || "",
          title: background.title || "",
          bio: background.bio || "",
          links: background.links || [],
        })
        .onConflictDoUpdate({
          target: tempDeveloperProfiles.id,
          set: {
            id: id,
            identityId: developerProfile.identityId,
            name: developerProfile.name,
            slug: developerProfile.slug,
            email: developerProfile.email,
            status: developerProfile.status,
            avatarUrl: background.avatarUrl || "",
            title: background.title || "",
            bio: background.bio || "",
            links: background.links || [],
          },
        });
    },
    async updateTempDeveloperProfile(
      developerProfile: updateTempDeveloperProfile
    ) {
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
    async updateForeignKey(backgroundId: number, developerProfileId: string) {
      await db.transaction(async (tx) => {
        await tx
          .update(developerProfileSkills)
          .set({ developerProfileId: developerProfileId })
          .where(eq(developerProfileSkills.backgroundId, backgroundId));
        await tx
          .update(developerProfileLanguages)
          .set({ developerProfileId: developerProfileId })
          .where(eq(developerProfileLanguages.backgroundId, backgroundId));
        await tx
          .update(developerProfileEducations)
          .set({ developerProfileId: developerProfileId })
          .where(eq(developerProfileEducations.backgroundId, backgroundId));
      });
    },
    //can be removed after completed merge
    async getBackground(id: string) {
      const background = await db
        .select()
        .from(developerProfileBackgrounds)
        .where(eq(developerProfileBackgrounds.developerProfileId, id));
      return background[0];
    },
    //can be removed after completed merge
    async getAllBackgroundIds() {
      return await db
        .select({
          id: developerProfileBackgrounds.id,
          developerProfileId: developerProfileBackgrounds.developerProfileId,
        })
        .from(developerProfileBackgrounds);
    },
  };
}
