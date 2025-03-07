import Link from "next/link";
import { developerProfilesService } from "../instance";
import { Separator } from "@/components";

type Props = {
  identityId: string;
};

export async function DeveloperAssignments({ identityId }: Props) {
  const assignments =
    await developerProfilesService.getScoredAssignmentsByIdentityId(identityId);
  const averageScore =
    await developerProfilesService.getAverageScoresByIdentityId(identityId);

  const getScoreColorClass = (score: number) => {
    if (score <= 50) {
      return "text-red-600 font-extrabold"; // Red for score <= 50
    } else if (score >= 51 && score <= 94) {
      return "text-orange-500"; // Orange for score 51-94
    } else {
      return "text-green-500"; // Green for score >= 95
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center py-2">
        <h2 className="text-2xl font-semibold">Assignments</h2>
      </div>
      <Separator className="mb-4" />
      <div className="space-y-4">
        {assignments.map((assignment) => {
          return (
            <div
              key={assignment.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <Link
                  href={`/developer-dashboard/assignments/${assignment.slug}`}
                  className="text-header font-medium hover:underline hover:underline-offset-4"
                >
                  {assignment.title}
                </Link>
              </div>
              <div className="flex items-center gap-2 mr-2">
                <div
                  className={`text-sm font-bold ${getScoreColorClass(averageScore)}`}
                >
                  {averageScore}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
