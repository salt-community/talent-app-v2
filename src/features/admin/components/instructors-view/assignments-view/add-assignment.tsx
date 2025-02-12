"use client";
import { Button } from "@/components/ui/button";
import { createAssignmentAction } from "@/features/admin/action";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Props = {
  cohorts: { id: string; name: string }[];
};

export function AddAssignmentForm({ cohorts }: Props) {
  const [selectedCohort, setSelectedCohort] = useState("");

  return (
    <form action={createAssignmentAction} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter assignment title"
          required
        />
      </div>

      <div>
        <Label htmlFor="categories">Categories</Label>
        <Input
          id="categories"
          name="categories"
          placeholder="Enter categories (comma-separated)"
        />
        <p className="text-sm text-gray-500 mt-1">
          Separate multiple categories with commas
        </p>
      </div>

      <div>
        <Label htmlFor="cohortId">Cohort</Label>
        <Select value={selectedCohort} onValueChange={setSelectedCohort}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Cohort" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cohorts</SelectLabel>
              {cohorts.map((cohort) => (
                <SelectItem
                  key={cohort.id}
                  value={cohort.id}
                  className="cursor-pointer"
                >
                  {cohort.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <input type="hidden" name="cohortId" value={selectedCohort} />
      </div>

      <div>
        <Label htmlFor="comment">Comment</Label>
        <Textarea
          id="comment"
          name="comment"
          placeholder="Add any additional comments or instructions"
          className="min-h-[100px]"
        />
      </div>

      <Button type="submit" className="w-full">
        Create Assignment
      </Button>
    </form>
  );
}
