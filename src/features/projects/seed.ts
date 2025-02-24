import { seedProjectService } from "./instance";

export async function seedProjects(developersProfileIds: string[]) {
  console.log("Starting to seed Projects...");

  const projects = [
    {
      repository: "https://github.com/DefyCab/contractor-companion",
      description:
        "KYC360 is a full-stack application designed to streamline the KYC (Know Your Customer) process for bank employees. This system ensures compliance with GDPR by enabling secure and efficient document collection directly from customers.",
      imageUrl: "byggmax.jpg",
      projectWebsite: "",
      userId: developersProfileIds[0],
    },
    {
      repository: "https://github.com/Infinite-Loopers2024/slow-chat-final",
      description:
        "This project is a showcase of my skills, experience, and a little about myself.",
      imageUrl: "chat.png",
      projectWebsite: "",
      userId: developersProfileIds[1],
    },
  ];

  try {
    for (const project of projects) {
      await seedProjectService.add(project);
    }

    console.log("Done seeding Projects!");
  } catch (error) {
    console.log("Error seeding Projects", error);
  }
}
