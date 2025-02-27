import {
  Button,
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateFormSchema } from "../validation";
type Placeholder = {
  description: string;
  imageUrl: string | null;
  imageAlt: string | null;
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
      imageAlt: placeholder.imageAlt!,
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
          <FormLabel>{"Image's alternative text"}</FormLabel>
          <FormControl>
            <Input type="text" {...form.register("imageAlt")} />
          </FormControl>
          <FormMessage>{form.formState.errors.imageAlt?.message}</FormMessage>
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
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
