import { relations } from "drizzle-orm/relations";
import { backgrounds, backgroundSkills, soso, backgroundEducations, backgroundLanguages } from "./schema";

export const backgroundSkillsRelations = relations(backgroundSkills, ({one}) => ({
	background: one(backgrounds, {
		fields: [backgroundSkills.backgroundId],
		references: [backgrounds.id]
	}),
}));

export const backgroundsRelations = relations(backgrounds, ({many}) => ({
	backgroundSkills: many(backgroundSkills),
	sosos: many(soso),
	backgroundEducations: many(backgroundEducations),
	backgroundLanguages: many(backgroundLanguages),
}));

export const sosoRelations = relations(soso, ({one}) => ({
	background: one(backgrounds, {
		fields: [soso.backgroundId],
		references: [backgrounds.id]
	}),
}));

export const backgroundEducationsRelations = relations(backgroundEducations, ({one}) => ({
	background: one(backgrounds, {
		fields: [backgroundEducations.backgroundId],
		references: [backgrounds.id]
	}),
}));

export const backgroundLanguagesRelations = relations(backgroundLanguages, ({one}) => ({
	background: one(backgrounds, {
		fields: [backgroundLanguages.backgroundId],
		references: [backgrounds.id]
	}),
}));