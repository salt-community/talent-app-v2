"use client";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import { H3 } from "@/components";
import Link from "next/link";
import { ProjectDescription } from "./project-description";
import { Project } from "../types";
import EditProjectDetails from "./edit-project-details";
import MetricSidebar from "./project-metric-sidebar";

type Props = {
  project: Project;
};

export default function ProjectDetails({ project }: Props) {
  const repository = project.repository.split("/")[4];
  return (
    <>
      <div className="flex justify-between items-baseline">
        <div className="flex flex-col ">
          <Link
            href={project.repository}
            className="ml-2  opacity-80 hover:opacity-100"
          >
            <H3>{project.title}</H3>
            <p className="text-xs text-paragraphLight flex items-center gap-2">
              <FaGithub size={16} color="gray" />
              Last commit {"Today"}
            </p>
          </Link>
        </div>
        <EditProjectDetails key={project.id} project={project} />
      </div>
      <section className="flex justify-between items-start mt-2 gap-2">
        <Image
          src={
            project.imageUrl
              ? `https://raw.githubusercontent.com/${project.username}/${repository}/main/public/${project.imageUrl}`
              : "/placholder-img.png"
          }
          width={250}
          height={240}
          alt=""
          unoptimized
          className="m-2 object-fill h-60 rounded-lg "
        />
        <MetricSidebar
          commits={project.commits}
          performance={project.performance}
          issues={project.issues}
        />
      </section>
      <ProjectDescription description={project.description} />
    </>
  );
}
