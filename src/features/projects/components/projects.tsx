import { Separator, H2 } from "@/components";
import { projectService } from "../instance";
import ProjectDetails from "./project-details";
import ProjectForm from "./project-form";

export async function Projects() {
  const userId = "ecd3c615-35d6-4890-b867-4e51a411f34d";
  const data = await projectService.getAll(userId);
  const projects = data.sort((a, b) => a.title.localeCompare(b.title));

  if (projects.length === 0) {
    return (
      <div>
        <H2>Projects</H2>
        <div className="flex flex-col justify-center mt-4">
          <p>No projects found</p>
        </div>
        <div className="flex justify-end">
          <ProjectForm />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <H2>Projects</H2>
      <div className="flex flex-col justify-center mt-4">
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectDetails project={project} />
            <Separator className="mt-4 mb-6" />
          </div>
        ))}
      </div>
      <div className="flex justify-end mb-4">
        <ProjectForm />
      </div>
    </div>
  );
}
