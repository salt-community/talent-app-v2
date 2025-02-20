import { relations } from "drizzle-orm";
import { backgrounds, educations, languages, skills } from "./schema";

export const backgroundsRelations = relations(backgrounds, ({ many }) => ({
  skills: many(skills),
  educations: many(educations),
  languages: many(languages),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  background: one(backgrounds, {
    fields: [skills.backgroundId],
    references: [backgrounds.id],
  }),
}));

export const educationsRelations = relations(educations, ({ one }) => ({
  background: one(backgrounds, {
    fields: [educations.backgroundId],
    references: [backgrounds.id],
  }),
}));

export const languagesRelations = relations(languages, ({ one }) => ({
  background: one(backgrounds, {
    fields: [languages.backgroundId],
    references: [backgrounds.id],
  }),
}));
