"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import { H3, Separator } from "@/components";
import Link from "next/link";
import { ProjectDescription } from "./project-description";
import { Project } from "../types";
import EditProjectDetails from "./edit-project-details";

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
            <p className="text-xs text-gray-400 flex items-center gap-2">
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
          className="m-2 object-cover rounded-lg"
        />
        <div className="flex flex-col items-center justify-between gap-4 mt-2 mr-2">
          <article className="flex flex-col items-center my-2">
            <p className="text-gray-400 text-sm">Commits</p>
            <p className="font-semibold">{project.commits}</p>
          </article>
          <Separator orientation="horizontal" />
          <article className="flex flex-col items-center my-2">
            <p className="text-gray-400 text-sm">Issues</p>
            <p className="font-semibold">{project.issues}</p>
          </article>
          <Separator orientation="horizontal" />
          <article className="flex flex-col items-center my-2">
            <p className="text-gray-400 text-sm">Performance</p>
            <p className="font-semibold">{project.performance}</p>
          </article>
        </div>
      </section>
      <ProjectDescription description={project.description} />
    </>
  );
}
