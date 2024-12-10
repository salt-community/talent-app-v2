import { Separator, H2 } from "@/components";
import { projectService } from "../instance";
import AddProject from "./add-project";
import ProjectDetails from "./project-details";
import ProjectForm from "./project-form";

export async function Projects() {
  const projects = await projectService.getAll();

  if (projects.length === 0) {
    return (
      <div>
        <H2>Projects</H2>
        <div className="flex flex-col justify-center mt-4">
          <p>No projects found</p>
        </div>
        <div className="flex justify-end">
        <AddProject />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <H2>Projects</H2>
      <div className="flex flex-col justify-center mt-4">
        {projects.map((project, index) => (
          <div key={index}>
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
