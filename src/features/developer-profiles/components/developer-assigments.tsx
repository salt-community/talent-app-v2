import { developerProfilesService } from "../instance";

type Props = {
  identityId: string;
};

export async function DeveloperAssignments({ identityId }: Props) {
  const assignments =
    await developerProfilesService.getScoredAssignmentsByIdentityId(identityId);

  return (
    <div>
      <div>
        {assignments.length === 0 ? (
          <div>No assignments</div>
        ) : (
          assignments.map((assignment) => (
            <div key={assignment.id}>
              {
                <div>
                  <div>{assignment.title}</div>
                  <div>{assignment?.scores?.status}</div>
                </div>
              }
            </div>
          ))
        )}
      </div>
    </div>
  );
}
