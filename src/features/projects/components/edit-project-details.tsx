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
import { updateAction, deleteAction, updatePerformanceScore } from "../actions";
import * as Toast from "@radix-ui/react-toast";
import { useState } from "react";

type Props = {
  project: Project;
};

const formSchema = z.object({
  description: z.string(),
});

export default function EditProjectDetails({ project }: Props) {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: project.description,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedProject = {
      id: project.id,
      description: values.description,
    };

    try {
      await updateAction(updatedProject);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  async function updatePerformance() {
    try {
      setLoading(true);
      await updatePerformanceScore(project.projectWebsite, project.id);
    } catch (error) {
      console.log("error updating performance:", error);
    }
    setLoading(false);
  }

  async function deleteProject() {
    setToastMessage({
      title: "Confirm Deletion",
      description: "Do you really want to delete this project?",
    });
    console.log(project.id);
    setToastOpen(true);
  }

  async function deleteInToast() {
    try {
      await deleteAction(project.id);
      setToastMessage({
        title: "Project deleted",
        description: "Project deleted successfully",
      });
    } catch (error) {
      setToastMessage({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setToastOpen(false);
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
            Update performance score
          </Button>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
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
                  <Button onClick={deleteProject}>Delete</Button>
                  <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
          <Toast.Provider swipeDirection="right">
            <Toast.Root
              open={toastOpen}
              onOpenChange={setToastOpen}
              className="bg-slate-800 text-white p-4 rounded-lg shadow-lg max-w-xs mx-2"
            >
              <Toast.Title className="font-bold mb-2">
                {toastMessage.title}
              </Toast.Title>
              <Toast.Description className="text-sm">
                {toastMessage.description}
              </Toast.Description>

              <div className="flex justify-end gap-4 mt-4">
                {toastMessage.title === "Confirm Deletion" && (
                  <button
                    className="bg-slate-400 text-white px-4 py-2 rounded-lg hover:bg-slate-500"
                    onClick={deleteInToast}
                  >
                    Delete
                  </button>
                )}

                <Toast.Action
                  asChild
                  altText="Close"
                  className="text-sm underline cursor-pointer text-gray-400 hover:text-white"
                >
                  <button>Close</button>
                </Toast.Action>
              </div>
            </Toast.Root>
            <Toast.Viewport className="fixed top-2 right-2 flex flex-col gap-4 z-50" />
          </Toast.Provider>
        </DialogContent>
      </Dialog>
    </>
  );
}
