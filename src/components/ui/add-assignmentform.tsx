"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { addAssignmentAction } from "@/features/assignments/actions";

const assignmentSchema = z.object({
  title: z.string().nonempty("Title is required"),
  score: z
    .string()
    .transform((val) => Number(val))
    .refine((num) => !isNaN(num), "Score must be a number")
    .refine((num) => num >= 0, "Score must be >= 0"),
  comment: z.string().optional(),
  tags: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",").map((t) => t.trim()) : [])),
  dueDate: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        const dateVal = new Date(value);
        return dateVal > new Date();
      },
      { message: "Due date must be in the future" }
    ),
  // cohort field here later
});

type FormValues = z.infer<typeof assignmentSchema>;

export function AddAssignmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      title: "",
      score: 0,
      comment: "",
      tags: [],
      dueDate: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("score", data.score.toString());
      formData.append("comment", data.comment || "");
      formData.append("tags", (data.tags ?? []).join(","));
      if (data.dueDate) {
        formData.append("dueDate", data.dueDate);
      }

      const result = await addAssignmentAction(undefined, formData);
      console.log("RESULT ==>", result);

      if (result?.errorMessages) {
        if (result.errorMessages.titleError) {
          toast.error(result.errorMessages.titleError);
        }
        if (result.errorMessages.scoreError) {
          toast.error(result.errorMessages.scoreError);
        }
      } else {
        toast.success("Assignment created successfully!");
        reset();
      }
    } catch (err) {
      toast.error("Failed to add assignment. Check console or logs.");
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
        <label htmlFor="title" className="block font-semibold">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="border px-2 py-1 w-full"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-600 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="score" className="block font-semibold">
          Score
        </label>
        <input
          id="score"
          type="number"
          className="border px-2 py-1 w-full"
          {...register("score")}
        />
        {errors.score && (
          <p className="text-red-600 text-sm">{errors.score.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="comment" className="block font-semibold">
          Comment
        </label>
        <textarea
          id="comment"
          className="border px-2 py-1 w-full"
          {...register("comment")}
        />
        {errors.comment && (
          <p className="text-red-600 text-sm">{errors.comment.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tags" className="block font-semibold">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          type="text"
          className="border px-2 py-1 w-full"
          {...register("tags")}
        />
      </div>

      <div>
        <label htmlFor="dueDate" className="block font-semibold">
          Due Date
        </label>
        <input
          id="dueDate"
          type="date"
          className="border px-2 py-1 w-full"
          {...register("dueDate")}
        />
        {errors.dueDate && (
          <p className="text-red-600 text-sm">{errors.dueDate.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? "Adding..." : "Add Assignment"}
      </button>
    </form>
  );
}
