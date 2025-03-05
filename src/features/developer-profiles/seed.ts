"use server";
import { insecureDeveloperProfilesService } from "./instance";
import { IdentitySelect } from "../iam";
import { BackgroundInsert, DeveloperProfileInsert } from "./types";
import { skills } from "./seed-data";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

export async function seedTempDeveloperProfiles(identities: IdentitySelect[]) {
  console.log("Seeding developer profiles...");

  const developers: DeveloperProfileInsert[] = [];
  const backgrounds: BackgroundInsert[] = [];
  for (const identity of identities) {
    const randomNumber = Math.random() * 10;
    const status =
      randomNumber < 5 ? ("highlighted" as const) : ("published" as const);
    const id = uuidv4();
    developers.push({
      id: id,
      identityId: identity.id,
      slug: identity.name.toLowerCase().replace(" ", "-"),
      name: identity.name,
      email: identity.email,
      status,
    });
    backgrounds.push({
      name: "",
      developerProfileId: id,
      title: "",
      bio: "",
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
    });
  }

  const developerId: string[] = [];
  for (let i = 0; i < developers.length; i++) {
    developerId.push(developers[i].id!);
    await insecureDeveloperProfilesService.addTempDeveloperProfile({
      developerProfile: developers[i],
      backgrounds: backgrounds[i],
    });
    await insecureDeveloperProfilesService.addDeveloperProfileDetails(
      backgrounds[i]
    );
  }

  console.log("Done seeding developer profiles!");
  return developerId;
}
