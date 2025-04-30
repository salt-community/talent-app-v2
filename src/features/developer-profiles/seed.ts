"use server";
import { IdentitySelect } from "../iam";
import { AddDeveloperProfile, developerProfileDetails } from "./types";
import { skills } from "./seed-data";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { developerProfilesSeedingService } from "./instance";

export async function seedDeveloperProfiles(identities: IdentitySelect[]) {
  console.log("Seeding developer profiles...");
  const developerIds: string[] = [];
  
  try {
    for (const identity of identities) {
      const randomNumber = Math.random() * 10;
      const status = randomNumber < 5 ? "highlighted" as const : "published" as const;
      const id = uuidv4();
      
      const slug = await developerProfilesSeedingService.generateUniqueSlug(
        identity.name
      );
      
      const developerProfile: AddDeveloperProfile = {
        id: id,
        identityId: identity.id,
        slug: slug, 
        name: identity.name,
        email: identity.email,
        avatarUrl: faker.image.avatar(),
        status,
      };
      
      const background: developerProfileDetails = {
        id: id,
        languages: faker.helpers.arrayElements(
          [
            "English", "Swedish", "Spanish", "French", "German", "Italian", "Russian",
            "Chinese", "Japanese", "Korean", "Arabic", "Persian", "Turkish", "Hindi",
            "Urdu", "Bengali", "Punjabi", "Telugu", "Marathi", "Tamil", "Gujarati",
            "Kannada", "Odia", "Malayalam",
          ],
          { min: 1, max: 6 }
        ),
        educations: faker.helpers.arrayElements(
          [
            "B.Sc. in Computer Science", "M.Sc. in Artificial Intelligence",
            "Ph.D. in Software Engineering", "Diploma in Data Science",
            "Certificate in UX Design", "Bootcamp in Web Development",
            "Online course in Machine Learning", "Self-taught Programmer",
            "High School Diploma", "GED", "Vocational School",
            "Associate Degree", "Bachelor's Degree",
          ],
          { min: 0, max: 4 }
        ),
        skills: faker.helpers.arrayElements(skills, { min: 3, max: 10 }),
        links: faker.helpers
          .arrayElements(
            [
              { url: "https://github.com/alimohseni99", name: "Github" },
              { url: "https://www.linkedin.com/in/ali-mohseni-se", name: "LinkedIn" },
              { url: "https://www.alimohseni.se/", name: "Resume" },
            ],
            { min: 1, max: 3 }
          )
          .sort((a, b) => a.name.localeCompare(b.name)),
      };
      
      await developerProfilesSeedingService.addDeveloperProfile(developerProfile);
      
      developerIds.push(id);
      
      console.log(`Added developer profile for ${identity.name} with ID ${id}`);
    }
    
    await developerProfilesSeedingService.repopulateSearch();
    console.log(`Done seeding ${developerIds.length} developer profiles!`);
    
    return developerIds;
  } catch (error) {
    console.error("Error seeding developer profiles:", error);
    throw error;
  }
}