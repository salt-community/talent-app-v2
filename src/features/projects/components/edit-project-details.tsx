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
import { AlertDialogDemo } from "@/components/ui/alert-dialog/alertDialog";

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

  async function updateDescription() {
    try {
      await updateDescriptionAction({
        id: project.id,
        description: form.getValues("description"),
      });
    } catch (error) {
      console.error("Error updating description");
    }
  }

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
          <Pencil type="submit" size={16} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit project</DialogTitle>
            <DialogDescription>
              Make changes to your project here. Click save when you´re done.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={updatePerformance} disabled={loading ? true : false}>
            {loading ? <Loader2 className="animate-spin" /> : undefined}
            {loading ? "Updating, please wait..." : "Update score"}
          </Button>
          <Form {...form} control={form.control}>
            <form className="flex flex-col gap-4">
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    {...form.register("description")}
                  />
                </FormControl>
                <FormDescription>
                  A brief description of your project.
                </FormDescription>
                <FormMessage>
                  {form.formState.errors.description?.message}
                </FormMessage>
              </FormItem>
              <DialogFooter>
                <div className="flex gap-6 justify-end">
                  <AlertDialogDemo
                    title={"Are you sure?"}
                    description={"This will delete your whole page!"}
                    onConfirm={deleteProject}
                  >
                    <Button>Delete</Button>
                  </AlertDialogDemo>
                  <Button onClick={updateDescription}>Save</Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
