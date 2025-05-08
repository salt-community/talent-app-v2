"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addAssignmentAction } from "../../action";
import { DialogTitle } from "@/components/ui/dialog";
import { Assignment } from "../../types";
import { MultipleCategorySelector } from "./multiple-category-selector";
import { Option } from "@/components/ui/multiple-selector";

type Props = {
  cohortId: string;
  assignment: Assignment;
  onSuccess: () => void;
};

export function AddAssignmentForm({ cohortId, assignment, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(assignment?.title || "");

  const [selectedCategories, setSelectedCategories] = useState<Option[]>(
    assignment?.categories?.map((category) => ({
      label: category,
      value: category,
    })) || []
  );

  const handleSubmit = async () => {
    setLoading(true);

    const categories = selectedCategories.map((cat) => cat.value);
    await addAssignmentAction(assignment?.id, cohortId, title, categories);
    onSuccess();
    setLoading(false);
  };

  return (
    <div className="space-y-6 p-4">
      <DialogTitle>Add assignment</DialogTitle>
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
          value={selectedCategories}
          onChange={setSelectedCategories}
        />
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full"
        disabled={!title || selectedCategories.length === 0 || loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
}
