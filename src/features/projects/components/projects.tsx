import { Separator, H2 } from "@/components";
import { projectService } from "../instance";
import ProjectDetails from "./project-details";
import ProjectForm from "./project-form";

type Props = {
  userId: string;
};

export async function Projects({ userId }: Props) {
  const data = await projectService.getAll(userId);
  const projects = data.sort((a, b) => a.title.localeCompare(b.title));

  if (projects.length === 0) {
    return (
      <div>
        <H2>Projects</H2>
        <div className="flex flex-col justify-center mt-4">
          <p>Add your projects here</p>
        </div>
        <div className="flex justify-end">
          <ProjectForm userId={userId} />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <H2>Projects</H2>
      <div className="flex flex-col justify-center mt-4">
        {projects.map((project) => (
          <div key={project.userId}>
            <ProjectDetails project={project} />
            <Separator className="mt-4 mb-6" />
          </div>
        ))}
      </div>
      <div className="flex justify-end mb-4">
        <ProjectForm userId={userId} />
      </div>
    </div>
  );
}
