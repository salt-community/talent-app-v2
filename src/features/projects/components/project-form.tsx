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

const mockUser = {
  userId: "ecd3c615-35d6-4890-b867-4e51a411f34d",
};

export default function ProjectForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted with values:", values);
    try {
      await addProjectAction({
        repository: values.repository,
        projectWebsite: values.projectWebsite ? values.projectWebsite : "",
        description: values.description,
        userId: mockUser.userId,
      });
      toast({
        title: "Project added",
        description: "Project added successfully",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : String(error),
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="submit">Add project</Button>
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
                  {...form.register("projectWebsite")}
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
              <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
