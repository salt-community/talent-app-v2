"use client";

import { Pencil } from "lucide-react";
import { z } from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components";
import { Project } from "../types";
import {
  updateDescriptionAction,
  deleteProjectAction,
  revalidate,
  updateProjectDataAction,
} from "../actions";
import { useState } from "react";
import UpdateDescription from "./update-description";
import UpdateData from "./update-data";
import DeleteProject from "./delete-project";
import { updateFormSchema } from "../validation";

type Props = {
  project: Project;
};

export default function EditProjectDetails({ project }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  async function updateProjectData() {
    try {
      setLoading(true);
      await updateProjectDataAction(
        project.id,
        project.userId,
        project.repository,
        project.projectWebsite!,
      );
    } catch (error) {
      console.log("error updating project:", error);
    }
    setLoading(false);
    revalidate();
  }

  async function onSubmit(values: z.infer<typeof updateFormSchema>) {
    const updateDescription = {
      id: project.id,
      description: values.description,
      imageUrl: values.imageUrl,
      imageAlt: values.imageAlt,
    };
    try {
      await updateDescriptionAction(updateDescription);
      setIsDialogOpen(false);
    } catch (error) {
      console.log("error updating performance:", error);
    }
    revalidate();
  }
  async function deleteProject() {
    await deleteProjectAction(project.id);
  }
  const placeholder = {
    description: project.description,
    imageUrl: project.imageUrl,
    imageAlt: project.imageAlt
  };
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Pencil size={20} strokeWidth={2.5} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit project</DialogTitle>
            <DialogDescription>
              Make changes to your project here. Click save when you´re done.
            </DialogDescription>
          </DialogHeader>
          <UpdateData onClick={updateProjectData} loading={loading} />
          <UpdateDescription onSubmit={onSubmit} placeholder={placeholder} />
          <DeleteProject onClick={deleteProject} />
        </DialogContent>
      </Dialog>
    </>
  );
}
