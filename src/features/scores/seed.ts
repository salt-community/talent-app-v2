import { scoresService } from "./instance";

const getRandomTags = (allTags: string[], maxTags: number): string[] => {
    const shuffled = [...allTags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * maxTags) + 1);
};


export const seedScores = async (count = 10) => {
    for (let i = 0; i < count; i++) {
        const newScore = {
            frontend: Math.round(Math.random() * 100),
            backend: Math.round(Math.random() * 100),
            individualCommunication: Math.round(Math.random() * 100),
            teamCollaboration: Math.round(Math.random() * 100),
            design: Math.round(Math.random() * 100),
            management: Math.round(Math.random() * 100),
        };

        try {
            await scoresService.addScores(newScore);
        } catch (error) {
            console.error("Something went wrong when seeding scores: " + error);
        }
    }
};

export const seedAssignments = async (count = 10) => {
    const allTags = ["frontend", "backend", "individualCommunication", "teamCollaboration", "design", "management"];
    const maxTags = allTags.length; 
    for (let i = 0; i < count; i++) {
        const newAssignment = {
            userId: 1,
            title: `assignment-${i + 1}`,
            comment: `Random comment ${i + 1}`,
            score: Math.round(Math.random() * 100),
            tags: getRandomTags(allTags, maxTags),
        };

        try {
            await scoresService.addAssignment(newAssignment);
        } catch (error) {
            console.error("Something went wrong when seeding assignments: " + error);
        }
    }
    
};
