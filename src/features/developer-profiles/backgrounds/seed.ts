import { faker } from "@faker-js/faker";
import { insecureBackgroundsService } from "./instance";
import { skills } from "./seed-data";

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
    await insecureBackgroundsService.add(background);
  }

  console.log("Done seeding Backgrounds!");
}
