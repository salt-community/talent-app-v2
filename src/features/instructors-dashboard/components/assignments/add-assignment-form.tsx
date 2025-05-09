"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addAssignmentAction } from "../../action";
import { DialogTitle } from "@/components/ui/dialog";
import { AssignmentWithCategories, Category } from "../../types";
import { MultipleCategorySelector } from "./multiple-category-selector";
import { Option } from "@/components/ui/multiple-selector";

type Props = {
  cohortId: string;
  assignment: AssignmentWithCategories;
  onSuccess: () => void;
};

export function AddAssignmentForm({ cohortId, assignment, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(assignment.assignments?.title || "");

  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    assignment && assignment.categories && assignment.categories.length > 0
      ? assignment.categories.map((category: Category) => ({
          label: category.name,
          value: category.id,
          fixed: true,
        }))
      : []
  );

  const handleSubmit = async () => {
    setLoading(true);

    const categories = selectedOptions.map((option) => option.value);

    await addAssignmentAction(
      assignment?.assignments.id || "",
      cohortId,
      title,
      categories
    );

    onSuccess();
    setLoading(false);
  };

  return (
    <div className="space-y-6 p-4">
      <DialogTitle>
        {assignment.assignments?.id ? "Edit assignment" : "Add assignment"}
      </DialogTitle>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter assignment title"
          required
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="categories">Categories</Label>
        <MultipleCategorySelector
          value={selectedOptions}
          onChange={setSelectedOptions}
        />
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full"
        disabled={!title || loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
}
