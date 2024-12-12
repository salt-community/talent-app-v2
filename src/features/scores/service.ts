import { Db } from "@/db";
import { createRepository } from "./repository";
//import { calculateCategoriesScores } from "./logic";
import { NewAssignment } from "./types";

export const createService = (db: Db) => {
  const repository = createRepository(db);
  return {
    // getScoreById: async (userId: number) => {
    //   try {
    //     const score = (await repository.getById(userId))[0] as Scores;

    //     const {
    //       programmingScore,
    //       planningScore,
    //       communicationScore,
    //       averageScore,
    //     } = calculateCategoriesScores(score);

    //     return {
    //       id: userId,
    //       frontend: score.frontend,
    //       backend: score.backend,
    //       individualCommunication: score.individualCommunication,
    //       teamCollaboration: score.teamCollaboration,
    //       design: score.design,
    //       management: score.management,
    //       programmingScore,
    //       planningScore,
    //       communicationScore,
    //       averageScore,
    //     };
    //   } catch (error) {
    //     console.log(error);
    //     return {
    //       id: 1,
    //       frontend: 0,
    //       backend: 0,
    //       individualCommunication: 0,
    //       teamCollaboration: 0,
    //       design: 0,
    //       management: 0,
    //       programmingScore: 0,
    //       planningScore: 0,
    //       communicationScore: 0,
    //       averageScore: 0,
    //     };
    //   }
    // },
    // updateScores: async (userId: number, newScores: NewScores) => {
    //   await repository.updateScore(userId, newScores)
    // },

     addAssignment: async (newAssigment: NewAssignment) => {
      await repository.addAssignment(newAssigment);
    },
    getAssignmentsById: async (userId: number) => {
      return await repository.getAssignmentsById(userId)
    },
    deleteAllAssignments: async () => {
      await repository.deleteAllAssignments()
    },
/*     updateAssigment: async (id: number) => {
      await repository.updateAssigment(id).update()
    } */
  };
};
