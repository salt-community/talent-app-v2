"use server";
import { insecureDeveloperProfilesService } from "./instance";
import { IdentitySelect } from "../iam";
import { DeveloperProfileInsert } from "./types";
import { skills } from "./seed-data";
import { faker } from "@faker-js/faker";

export async function seedDeveloperProfiles(identities: IdentitySelect[]) {
  console.log("Seeding developer profiles...");

  const developers: DeveloperProfileInsert[] = [];
  for (const identity of identities) {
    developers.push({
      identityId: identity.id,
      slug: identity.name.toLowerCase().replace(" ", "-"),
      name: identity.name,
      email: identity.email,
    });
  }

  const developerProfileIds: string[] = [];

  for (const developer of developers) {
    developerProfileIds.push(
      (await insecureDeveloperProfilesService.add(developer)).id
    );
  }

  for (let i = 0; i < developerProfileIds.length; i++) {
    const id = developerProfileIds[i];
    const status = i < 5 ? ("highlighted" as const) : ("published" as const);

    await insecureDeveloperProfilesService.updateStatus({ id, status });
  }

  console.log("Done seeding developer profiles!");

  return developerProfileIds;
}

export async function backgroundsSeed(developerProfileIds: string[]) {
  console.log("Seeding Backgrounds...");

  const backgrounds = developerProfileIds.map((developerProfileId) => {
    return {
      developerProfileId: developerProfileId,
      name: faker.person.fullName(),
      title: faker.person.jobType(),
      bio: faker.person.bio(),
      avatarUrl: faker.image.avatar(),
      languages: faker.helpers.arrayElements(
        [
          "English",
          "Swedish",
          "Spanish",
          "French",
          "German",
          "Italian",
          "Russian",
          "Chinese",
          "Japanese",
          "Korean",
          "Arabic",
          "Persian",
          "Turkish",
          "Hindi",
          "Urdu",
          "Bengali",
          "Punjabi",
          "Telugu",
          "Marathi",
          "Tamil",
          "Gujarati",
          "Kannada",
          "Odia",
          "Malayalam",
        ],
        { min: 1, max: 6 }
      ),
      educations: faker.helpers.arrayElements(
        [
          "B.Sc. in Computer Science",
          "M.Sc. in Artificial Intelligence",
          "Ph.D. in Software Engineering",
          "Diploma in Data Science",
          "Certificate in UX Design",
          "Bootcamp in Web Development",
          "Online course in Machine Learning",
          "Self-taught Programmer",
          "High School Diploma",
          "GED",
          "Vocational School",
          "Associate Degree",
          "Bachelor's Degree",
        ],
        { min: 0, max: 4 }
      ),
      skills: faker.helpers.arrayElements(skills, { min: 3, max: 10 }),
      links: faker.helpers
        .arrayElements(
          [
            { url: "https://github.com/alimohseni99", name: "Github" },
            {
              url: "https://www.linkedin.com/in/ali-mohseni-se",
              name: "LinkedIn",
            },
            { url: "https://www.alimohseni.se/", name: "Resume" },
          ],
          { min: 1, max: 3 }
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    };
  });

  for (const background of backgrounds) {
    await insecureDeveloperProfilesService.addBackground(background);
  }

  console.log("Done seeding Backgrounds!");
}
