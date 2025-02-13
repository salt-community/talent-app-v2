import { CohortSelect } from "../cohorts";
import { categoryTags } from "./categories";
import { insecureAssignmentService } from "./instance";

const getRandomTags = (allTags: string[], maxTags: number): string[] => {
  const shuffled = [...allTags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * maxTags) + 1);
};

export const seedAssignments = async (cohorts: CohortSelect[]) => {
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

  await insecureAssignmentService.deleteAllAssignments();

  for (let i = 0; i < 5; i++) {
    const newAssignment = {
      cohortId: cohorts[0].id,
      title:
        assignmentTitles[Math.floor(Math.random() * assignmentTitles.length)],
      comment: `This is a comment for assignment ${i + 1}`,
      tags: getRandomTags(categoryTags, categoryTags.length),
      categories: getRandomTags(categoryTags, 3),
      score: Math.floor(Math.random() * 101),
    };

    try {
      const createdAssignment =
        await insecureAssignmentService.createAssignment(newAssignment);

      const scorePromises = cohorts.map(async (cohort) => {
        return insecureAssignmentService.createAssignmentScore({
          assignmentId: createdAssignment.id.toString(),
          identityId: cohort.id.toString(),
          score: Math.floor(Math.random() * 101),
          comment: `Comment for cohort ${cohort.name}`,
          createdAt: new Date(),
        });
      });

      await Promise.all(scorePromises);
    } catch (error) {
      console.error("Error while seeding assignments and scores:", error);
    }
  }
};
