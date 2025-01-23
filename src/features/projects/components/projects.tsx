import { Separator, H2 } from "@/components";
import { projectsService } from "../instance";
import ProjectDetails from "./project-details";
import ProjectForm from "./project-form";
import { errorHandler } from "@/lib";
import type { Project } from "../types";
import { createClient } from "../api/api";

type Props = {
  devId: string;
};

export async function Projects({ devId }: Props) {
  let projects: Project[] = [];
  let updatedProjects: Project[] = [];
  let editAccess = false;
  const client = createClient();
  try {
    projects = await projectsService.getAll(devId);
    if (projects.length > 0) {
      updatedProjects = await Promise.all(
        projects.map(async (project) => {
          try{
            const { username, title } = project;
            return {
              ...project,
              commits: await client.getTotalOfCommits(username, title),
              issues: await client.getAllIssues(username, title),
              lastCommit: await client.getLastCommit(username, title),
            };
          } catch(error){
            errorHandler(error);
            return project
          }
        })
      );
    }
    editAccess = await projectsService.checkProfileAccess(devId);
  } catch (error) {
    errorHandler(error);
  }

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
  //todo: project details have to be up to date
  return (
    <div className="mt-4">
      <H2>Projects</H2>
      <div className="flex flex-col justify-center mt-4 lg:grid lg:grid-cols-2 md:gap-8">
        {updatedProjects.map((project) => (
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
