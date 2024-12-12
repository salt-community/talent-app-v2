import { projectService } from "./instance";

export async function seedProjects() {
  const projects = [
    {
      repository: "https://github.com/alimohseni99/kyc360",
      description:
        "KYC360 is a full-stack application designed to streamline the KYC (Know Your Customer) process for bank employees. This system ensures compliance with GDPR by enabling secure and efficient document collection directly from customers.",
      imageUrl:
        "https://ca.slack-edge.com/TA01UCHBN-U07BFHZF4CB-c7ee64bed20c-512",
      projectWebsite: "",
      userId: "ecd3c615-35d6-4890-b867-4e51a411f34d",
    },
    {
      repository: "https://github.com/alimohseni99/portfolio",
      description:
        "This project is a showcase of my skills, experience, and a little about myself.",
      imageUrl:
        "https://ca.slack-edge.com/TA01UCHBN-U07BFHZF4CB-c7ee64bed20c-512",
      projectWebsite: "",
      userId: "ecd3c615-35d6-4890-b867-4e51a411f34d",
    },
  ];

  try {
    projects.map(async (project) => await projectService.add(project));
    console.log("Seeding of Projects complete!");
  } catch (error) {
    console.log("Error seeding Projects", error);
  }
}
