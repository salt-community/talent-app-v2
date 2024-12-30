import { Separator, H2 } from "@/components";
import { projectService } from "../instance";
import ProjectDetails from "./project-details";
import ProjectForm from "./project-form";

type Props = {
  devId: string;
};

export async function Projects({ devId }: Props) {
  const projects = await projectService.getAll(devId);

  const editAccess = await projectService.checkProfileAccess(devId);

  if (projects.length === 0) {
    return (
      <div>
        <H2>Projects</H2>
        {editAccess && (
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
      <div className="flex flex-col justify-center mt-4 md:grid md:grid-cols-2 md:gap-8">
        {projects.map((project) => (
          <div key={project.id} className="md:p-5 md:border md:rounded-md">
            <ProjectDetails project={project} editAccess={editAccess} />
            <Separator className="mt-4 mb-6 md:hidden" />
          </div>
        ))}
      </div>
      {editAccess && (
        <div className="flex justify-center">
          <ProjectForm userId={devId} />
        </div>
      )}
    </div>
  );
}
