"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Textarea,
  DialogContent,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components";
import { addProjectAction } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { formSchema } from "../validation";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Loader2 } from "lucide-react";

type Props = {
  userId: string;
};

export default function ProjectForm({ userId }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await addProjectAction({
        repository: values.repository,
        projectWebsite: values.projectWebsite ? values.projectWebsite : "",
        description: values.description,
        userId: userId,
        imageUrl: values.imageUrl,
      });
      toast({
        title: "Project added",
        description: "Project added successfully",
      });
      form.reset();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : String(error),
      });
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="submit"
          variant="outline"
          className="cursor-pointer flex gap-1 justify-center items-center mt-2 mb-4"
        >
          <Plus className="text-primary font-semibold" size={18} />
          <p className="font-semibold">Add project</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add project</DialogTitle>
          <DialogDescription>
            Add a new project here. Click submit when you´re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormItem>
              <FormLabel>Repository</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://github.com/devUser42/project-tracker"
                  type="text"
                  {...form.register("repository")}
                />
              </FormControl>
              <FormDescription>
                This is the GitHub repository link that you want to display.
              </FormDescription>
              <FormMessage>
                {form.formState.errors.repository?.message}
              </FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>Project Website (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com"
                  type="text"
                  {...form.register("projectWebsite")}
                />
              </FormControl>
              <FormDescription>
                The live website for your project, if available.
              </FormDescription>
              <FormMessage>
                {form.formState.errors.projectWebsite?.message}
              </FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  placeholder="image.png"
                  type="text"
                  {...form.register("imageUrl")}
                />
              </FormControl>
              <FormDescription>
                The name of a picture in your public-folder. Make sure it is
                available on the main branch.
              </FormDescription>
              <FormMessage>
                {form.formState.errors.projectWebsite?.message}
              </FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A comprehensive tool for tracking project milestones and tasks."
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
              <Button
                type="submit"
                disabled={loading}
                className="bg-zinc-900 text-white text-sm rounded-md w-full h-10 hover:bg-zinc-800"
              >
                {loading ? <Loader2 className="animate-spin" /> : undefined}
                {loading ? "Submitting, please wait..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
