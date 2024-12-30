import { Separator, H2 } from "@/components";
import { projectService } from "../instance";
import ProjectDetails from "./project-details";
import ProjectForm from "./project-form";

type Props = {
  devId: string;
};

export async function Projects({ devId }: Props) {
  const projects = await projectService.getAll(devId);

  const personalAccess = await projectService.checkProfileAccess(devId);

  if (projects.length === 0) {
    return (
      <div>
        <H2>Projects</H2>
        {personalAccess && (
          <>
            <div className="flex flex-col justify-center mt-4">
              <p>Add your projects here</p>
            </div>
            <Separator className="mt-4 mb-2" />

            <div className="flex justify-center">
              <ProjectForm userId={devId} />
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="mt-4">
      <H2>Projects</H2>
      {personalAccess && (
        <>
          <div className="flex flex-col justify-center mt-4">
            {projects.map((project) => (
              <div key={project.id}>
                <ProjectDetails project={project} />
                <Separator className="mt-4 mb-2" />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <ProjectForm userId={devId} />
          </div>
        </>
      )}
    </div>
  );
}
