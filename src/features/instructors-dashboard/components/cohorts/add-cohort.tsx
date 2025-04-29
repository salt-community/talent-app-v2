"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { addCohortAction } from "../../action";
import toast from "react-hot-toast";
import { addCohortFormSchema } from "../../validation";

export function AddCohortForm() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof addCohortFormSchema>>({
    resolver: zodResolver(addCohortFormSchema),
  });

  const onSubmit = async (values: z.infer<typeof addCohortFormSchema>) => {
    toast.promise(
      new Promise(async (resolve) => {
        await addCohortAction({
          name: values.name,
          description: values.description ? values.description : "",
        });
        resolve(true);
      }),
      {
        loading: "Creating cohort...",
        success: <b>Cohort created successfully!</b>,
        error: <b>Could not create cohort. Please try again.</b>,
      }
    );
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="submit"
          variant="outline"
          className="cursor-pointer"
        >
          <Plus color="black" size={18} />
          <p className="font-semibold">Add cohort</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add cohort</DialogTitle>
          <DialogDescription>
            Add a new cohort here. Click submit when you´re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  type="text"
                  className="border px-2 py-1 w-full"
                  placeholder="FS-2025"
                  required
                  {...form.register("name")}
                />
              </FormControl>
              <FormDescription>This is the name of the cohort.</FormDescription>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Fullstack Java class for 2025"
                  {...form.register("description")}
                />
              </FormControl>
              <FormDescription>
                This is the description of the cohort.
              </FormDescription>
              <FormMessage>
                {form.formState.errors.description?.message}
              </FormMessage>
            </FormItem>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full mt-2 cursor-pointer"
              >
                Add cohort
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
