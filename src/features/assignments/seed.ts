import { assignmentsSeedingService } from "./instance";
import { categoryTags } from "./categories";

const getRandomTags = (allTags: string[], maxTags: number): string[] => {
  const shuffled = [...allTags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * maxTags) + 1);
};

export const seedAssignments = async (cohortIds: string[]) => {
  console.log("Seeding assignments...");
  const assignmentTitles = [
    "Build a Responsive Portfolio Website",
    "Create a RESTful API with Node.js",
    "Design a Weather App with React",
    "Develop a Chat Application with WebSockets",
    "Implement Authentication in a Full-Stack App",
    "Optimize Performance for an E-commerce Site",
    "Build a Blog Platform with Next.js",
    "Create a Dynamic Dashboard with D3.js",
    "Design a Custom UI Library with Tailwind CSS",
    "Build a Quiz App with Firebase",
    "Develop a Kanban Board Application",
    "Create a Social Media Feed with Infinite Scroll",
    "Implement GraphQL in a Full-Stack App",
    "Build a Photo Gallery App with Lazy Loading",
    "Design a Multi-Step Form with Validation",
    "Create a Booking System for Events",
    "Develop a Real-Time Notification System",
    "Build a File Upload Service with Drag and Drop",
    "Design an Admin Panel for User Management",
    "Create a Survey Builder Application",
    "Implement a Payment Gateway Integration",
    "Build a Search Engine for Products",
    "Develop a Chatbot with NLP Integration",
    "Create a Custom Animation Library",
    "Design an Accessibility-First Web App",
  ];
  await assignmentsSeedingService.ensureCategoriesExist(
    getRandomTags(categoryTags, 10)
  );
  await assignmentsSeedingService.deleteAllAssignments();

  const usedSlugs = new Set();

  for (let i = 0; i < 5; i++) {
    try {
      const baseTitle =
        assignmentTitles[Math.floor(Math.random() * assignmentTitles.length)];
      const title = `${baseTitle} ${i}`;

      let slug = generateSlug(title);
      let counter = 1;

      while (usedSlugs.has(slug)) {
        slug = generateSlug(`${title}-${counter}`);
        counter++;
      }

      usedSlugs.add(slug);

      const createdAssignment =
        await assignmentsSeedingService.createAssignment({
          cohortId: cohortIds[0],
          title,
          categories: null,
        });

      const categoryIds =
        await assignmentsSeedingService.getRandomCategoryIds(3);

      const args = { assignmentId: createdAssignment.id, categoryIds };

      await assignmentsSeedingService.attachCategoriesToAssignment(args);
    } catch (error) {
      console.error(
        "Error while seeding assignments, check out the error below",
        error
      );
    }
  }
  console.log("Done seeding assignments!");
};

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-")
    .trim();
}
