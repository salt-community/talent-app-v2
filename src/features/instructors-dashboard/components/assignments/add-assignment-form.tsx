"use client";

import { Button } from "@/components/ui/button";
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
import { addAssignmentAction } from "../../action";

type Props = {
  // cohorts: { id: string; name: string }[];
  cohortId: string;
  onSuccess: () => void;
};

export function AddAssignmentForm({ cohortId, onSuccess }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      await addAssignmentAction(formData, cohortId);
      onSuccess();
    } catch (error) {
      console.error("Failed to create assignment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter assignment title"
          required
        />
      </div>

      {/* <div>
        <Label htmlFor="categories">Categories</Label>
        <Input
          id="categories"
          name="categories"
          placeholder="Enter categories (comma-separated)"
        />
        <p className="text-sm text-gray-500 mt-1">
          Separate multiple categories with commas
        </p>
      </div> */}

      <div>
        <Label htmlFor="categories">Category</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cohorts</SelectLabel>
              <SelectItem value="frontend" className="cursor-pointer">
                Frontend
              </SelectItem>
              <SelectItem value="backend" className="cursor-pointer">
                Backend
              </SelectItem>
              <SelectItem value="management" className="cursor-pointer">
                Management
              </SelectItem>
              <SelectItem value="conversation" className="cursor-pointer">
                Conversation
              </SelectItem>
              <SelectItem value="team collaboration" className="cursor-pointer">
                Team collaboration
              </SelectItem>
              <SelectItem value="design" className="cursor-pointer">
                Design
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <input
          type="hidden"
          id="categories"
          name="categories"
          value={selectedCategory}
        />
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

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
