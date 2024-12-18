import { pgTable, uuid, varchar, integer, jsonb, foreignKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const developerStatuses = pgEnum("developer_statuses", ['unpublished', 'published', 'highlighted'])
export const roles = pgEnum("roles", ['developer', 'core', 'admin'])


export const developerProfiles = pgTable("developer_profiles", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	identityId: varchar("identity_id").default('1'),
	name: varchar().notNull(),
	email: varchar().notNull(),
	status: developerStatuses().default('unpublished').notNull(),
});

export const identities = pgTable("identities", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	clerkId: varchar("clerk_id").notNull(),
	role: roles().default('developer').notNull(),
});

export const scoreAssignments = pgTable("score_assignments", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "score_assignments_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	devId: uuid("dev_id").notNull(),
	title: varchar().notNull(),
	comment: varchar(),
	score: integer().notNull(),
	tags: varchar().array().notNull(),
});

export const projects = pgTable("projects", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	username: varchar().notNull(),
	repository: varchar().notNull(),
	title: varchar().notNull(),
	imageUrl: varchar("image_url", { length: 500 }),
	projectWebsite: varchar("project_website"),
	description: varchar().notNull(),
	performance: varchar().notNull(),
	commits: varchar().notNull(),
	issues: varchar().notNull(),
	userId: uuid().defaultRandom().notNull(),
});

export const backgrounds = pgTable("backgrounds", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "backgrounds_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	devId: uuid("dev_id").notNull(),
	avatarUrl: varchar("avatar_url").default('/avatar.png').notNull(),
	name: varchar().notNull(),
	title: varchar().notNull(),
	bio: varchar().notNull(),
	links: jsonb().notNull(),
});

export const backgroundSkills = pgTable("background_skills", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "background_skills_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	backgroundId: integer("background_id").notNull(),
	name: varchar().notNull(),
	level: integer().default(5).notNull(),
}, (table) => {
	return {
		backgroundSkillsBackgroundIdBackgroundsIdFk: foreignKey({
			columns: [table.backgroundId],
			foreignColumns: [backgrounds.id],
			name: "background_skills_background_id_backgrounds_id_fk"
		}),
	}
});

export const soso = pgTable("soso", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "soso_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	backgroundId: integer("background_id").notNull(),
	name: varchar().notNull(),
	level: integer().default(5).notNull(),
}, (table) => {
	return {
		sosoBackgroundIdBackgroundsIdFk: foreignKey({
			columns: [table.backgroundId],
			foreignColumns: [backgrounds.id],
			name: "soso_background_id_backgrounds_id_fk"
		}),
	}
});

export const backgroundEducations = pgTable("background_educations", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "background_educations_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	backgroundId: integer("background_id").notNull(),
	name: varchar().notNull(),
}, (table) => {
	return {
		backgroundEducationsBackgroundIdBackgroundsIdFk: foreignKey({
			columns: [table.backgroundId],
			foreignColumns: [backgrounds.id],
			name: "background_educations_background_id_backgrounds_id_fk"
		}),
	}
});

export const backgroundLanguages = pgTable("background_languages", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "background_languages_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	backgroundId: integer("background_id").notNull(),
	name: varchar().notNull(),
	level: integer().default(5).notNull(),
}, (table) => {
	return {
		backgroundLanguagesBackgroundIdBackgroundsIdFk: foreignKey({
			columns: [table.backgroundId],
			foreignColumns: [backgrounds.id],
			name: "background_languages_background_id_backgrounds_id_fk"
		}),
	}
});
