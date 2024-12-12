"use client";

import { Loader2, Pencil } from "lucide-react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
  FormDescription,
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "../types";
import {
  updateDescriptionAction,
  deleteProjectAction,
  updatePerformanceScoreAction,
  revalidate,
} from "../actions";
import { useState } from "react";
import { AlertDialogDemo } from "@/components/alert-dialog/alertDialog";
import UpdateDescription from "./update-description";
import UpdateScore from "./updateScore";
import DeleteProject from "./delete-project";

type Props = {
  project: Project;
};

const formSchema = z.object({
  description: z.string(),
});

export default function EditProjectDetails({ project }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: project.description,
    },
  });

  async function updatePerformance() {
    try {
      setLoading(true);
      await updatePerformanceScoreAction(project.projectWebsite!, project.id);
    } catch (error) {
      console.log("error updating performance:", error);
    }
    setLoading(false);
    revalidate();
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updateDescription = {
      id: project.id,
      description: values.description,
    };
    try {
      setLoading(true);
      await updateDescriptionAction(updateDescription);
    } catch (error) {
      console.log("error updating performance:", error);
    }
    setLoading(false);
    revalidate();
  }

  async function deleteProject() {
    try {
      await deleteProjectAction(project.id);
      revalidate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Pencil size={16} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit project</DialogTitle>
            <DialogDescription>
              Make changes to your project here. Click save when you´re done.
            </DialogDescription>
          </DialogHeader>
          <UpdateScore onClick={updatePerformance} loading={loading} />
          <UpdateDescription onSubmit={onSubmit} placeholder={project.description} />
          <DeleteProject onClick={deleteProject} />
        </DialogContent>
      </Dialog>
    </>
  );
}
