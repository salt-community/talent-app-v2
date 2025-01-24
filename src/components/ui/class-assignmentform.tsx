"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { addCohortAssignmentAction } from "@/features/assignments/actions";
import { AssignmentFormData } from "@/features";

const classAssignmentSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
  tags: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",") : [])),
  cohort: z.string().nonempty("Please provide a cohort"),
});

type FormValues = z.infer<typeof classAssignmentSchema>;

export function ClassAssignmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(classAssignmentSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      cohort: "",
    },
  });

  const onSubmit = async (data: AssignmentFormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title || "");
      formData.append("description", data.description || "");
      formData.append("tags", (data.tags ?? []).join(","));
      formData.append("cohort", data.cohort || "");

      const result = await addCohortAssignmentAction(undefined, formData);

      if (result?.errorMessages) {
        if (result.errorMessages.titleError) {
          toast.error(result.errorMessages.titleError);
        }
      } else {
        toast.success("Cohort assignment created successfully!");
        reset();
      }
    } catch (err) {
      toast.error("Failed to add assignment to cohort. Check console or logs.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-md"
    >
      <div>
        <label className="block font-semibold">Title</label>
        <input
          type="text"
          className="border px-2 py-1 w-full"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-600 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold">Cohort</label>
        <input
          type="text"
          className="border px-2 py-1 w-full"
          {...register("cohort")}
        />
        {errors.cohort && (
          <p className="text-red-600 text-sm">{errors.cohort.message}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold">Description</label>
        <textarea
          className="border px-2 py-1 w-full"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-600 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold">Tags (comma-separated)</label>
        <input
          type="text"
          className="border px-2 py-1 w-full"
          {...register("tags")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? "Adding..." : "Add Assignment to Cohort"}
      </button>
    </form>
  );
}
