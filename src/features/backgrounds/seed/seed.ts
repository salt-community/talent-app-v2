import { faker } from "@faker-js/faker";
import { createRepository } from "../repository";
import { db } from "../db";
import { skills } from "./data";

const repository = createRepository(db);
export async function backgroundsSeed(devIds: string[]) {
  const avatars = await getAvatars(devIds.length);

  const backgrounds = devIds.map((devId, index) => {
    return {
      devId: devId,
      name: faker.person.fullName(),
      title: faker.person.jobType(),
      bio: faker.person.bio(),
      avatarUrl: avatars[index],
      languages: faker.helpers
        .arrayElements(
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
        )
        .map((language) => {
          return {
            id: faker.string.uuid(),
            text: language,
          };
        }),
      educations: faker.helpers
        .arrayElements(
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
        )
        .map((education) => {
          return {
            id: faker.string.uuid(),
            text: education,
          };
        }),
      skills: faker.helpers.arrayElements(skills, 10).map((skill) => {
        return {
          id: faker.string.uuid(),
          text: skill,
        };
      }),
      links: faker.helpers
        .arrayElements([
          { url: "https://github.com/alimohseni99", name: "Github" },
          {
            url: "https://www.linkedin.com/in/ali-mohseni-se",
            name: "LinkedIn",
          },
          { url: "https://www.alimohseni.se/", name: "Resume" },
        ])
        .sort((a, b) => a.name.localeCompare(b.name)),
    };
  });
  await Promise.all(
    backgrounds.map(async (background) => {
      await repository.add(background);
    })
  );
  console.log("Done seeding Backgrounds...");
}

async function getAvatars(count: number) {
  const result = await fetch(`https://randomuser.me/api/?results=${count}`);
  const data = await result.json();
  return data.results.map(
    (user: { picture: { large: unknown } }) => user.picture.large
  );
}
