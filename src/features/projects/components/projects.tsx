import { Separator, H2 } from "@/components";
import { projectsService } from "../instance";
import ProjectDetails from "./project-details";
import ProjectForm from "./project-form";
import { errorHandler } from "@/lib";
import type { Project } from "../types";
import { notFound } from "next/navigation";

type Props = {
  slug: string;
};

export async function Projects({ slug }: Props) {
  let projects: Project[] = [];
  let editAccess = false;

  const developerProfile = await projectsService.getAllDevelopers();
  const developerProfileId = developerProfile.find(
    (profile) => profile.slug === slug
  )?.id;
  if (!developerProfileId) {
    return notFound();
  }
  try {
    projects = await projectsService.getAll(developerProfileId);

    editAccess = await projectsService.checkProfileAccess(developerProfileId);
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
              <ProjectForm developerProfileId={developerProfileId} />
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="mt-4">
      <H2>Projects</H2>
      <div className="flex flex-col justify-center mt-4 lg:grid lg:grid-cols-2 md:gap-8">
        {projects.map((project) => (
          <div key={project.id} className="md:p-5 md:border md:rounded-md">
            <ProjectDetails project={project} editAccess={editAccess} />
            <Separator className="mt-4 mb-6 md:hidden" />
          </div>
        ))}
      </div>
      {editAccess && (
        <div className="flex justify-center">
          <ProjectForm developerProfileId={developerProfileId} />
        </div>
      )}
    </div>
  );
}
