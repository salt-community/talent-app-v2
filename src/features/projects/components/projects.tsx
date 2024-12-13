import { Separator, H2 } from "@/components";
import { projectService } from "../instance";
import ProjectDetails from "./project-details";
import ProjectForm from "./project-form";

type Props = {
  id: string;
};

export async function Projects({ id }: Props) {
  const data = await projectService.getAll(id);
  const projects = data.sort((a, b) => a.title.localeCompare(b.title));

  const mockUser = {
    userId: "ecd3c615-35d6-4890-b867-4e51a411f34d",
  };

  if (projects.length === 0) {
    return (
      <div>
        <H2>Projects</H2>
        <div className="flex flex-col justify-center mt-4">
          <p>Add your projects here</p>
        </div>
        <div className="flex justify-end">
          <ProjectForm userId={mockUser.userId} />
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
        <ProjectForm userId={mockUser.userId} />
      </div>
    </div>
  );
}
