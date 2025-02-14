"use client";

import { addCohortAction } from "../action";
import {
  Button,
  DialogContent,
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Form,
  FormItem,
  FormLabel,
  Input,
  FormControl,
  FormDescription,
  FormMessage,
  DialogFooter,
  FormField,
} from "@/components";
import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addCohortFormSchema } from "../validation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddCohortForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof addCohortFormSchema>>({
    resolver: zodResolver(addCohortFormSchema),
  });

  const onSubmit = async (values: z.infer<typeof addCohortFormSchema>) => {
    try {
      setLoading(true);
      await addCohortAction({
        name: values.name,
        description: values.description ? values.description : "",
        status: values.status,
      });
      toast({
        title: "Cohort added",
        description: "Cohort added successfully",
      });
      form.reset();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="submit"
          variant="outline"
          className="cursor-pointer flex gap-1 justify-center items-center mt-4 mb-4"
        >
          <Plus className="text-primary font-semibold" size={18} />
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
                <Input
                  id="description"
                  type="text"
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
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Statuses</SelectLabel>
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="finished">Finished</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This is the status of the cohort.
                  </FormDescription>
                  <FormMessage>
                    {form.formState.errors.status?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={loading}
                className="bg-zinc-900 text-white text-sm rounded-md w-full h-10 hover:bg-zinc-800 mt-2"
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
