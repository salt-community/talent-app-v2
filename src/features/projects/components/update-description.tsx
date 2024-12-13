import {
  DialogFooter,
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateFormSchema } from "../validation";
type Placeholder = {
  description: string;
  imageUrl: string | null;
};

type Props = {
  onSubmit: (data: z.infer<typeof updateFormSchema>) => void;
  placeholder: Placeholder;
};

export default function UpdateDescription({ onSubmit, placeholder }: Props) {
  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      description: placeholder.description,
      imageUrl: placeholder.imageUrl!,
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormItem>
          <FormLabel>Image</FormLabel>
          <FormControl>
            <Input type="text" {...form.register("imageUrl")} />
          </FormControl>
          <FormMessage>{form.formState.errors.imageUrl?.message}</FormMessage>
        </FormItem>
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
