import {
  Button,
  DialogFooter,
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  description: z.string(),
});

type Props = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  placeholder: string;
};

export default function UpdateDescription({ onSubmit, placeholder }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: placeholder,
    },
  });
  return (
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
          <DialogClose
            type="submit"
            className="bg-zinc-900 text-white text-sm rounded-md w-full h-10 hover:bg-zinc-800"
          >
            Save changes{" "}
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
