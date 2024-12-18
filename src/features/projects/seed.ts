import { seedProjectService } from "./instance";

export async function seedProjects() {
  const developersProfiles = await seedProjectService.getAllDevelopers();
  const projects = [
    {
      repository: "https://github.com/DefyCab/contractor-companion",
      description:
        "KYC360 is a full-stack application designed to streamline the KYC (Know Your Customer) process for bank employees. This system ensures compliance with GDPR by enabling secure and efficient document collection directly from customers.",
      imageUrl: "byggmax.jpg",
      projectWebsite: "",
      userId: developersProfiles[0].id,
    },
    {
      repository: "https://github.com/Infinite-Loopers2024/slow-chat-final",
      description:
        "This project is a showcase of my skills, experience, and a little about myself.",
      imageUrl: "chat.png",
      projectWebsite: "",
      userId: developersProfiles[1].id,
    },
  ];

  try {
    projects.map(async (project) => await seedProjectService.add(project));
    console.log("Seeding of Projects complete!");
  } catch (error) {
    console.log("Error seeding Projects", error);
  }
}
