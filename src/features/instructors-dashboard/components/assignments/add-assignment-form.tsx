"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
  cohortId: string;
  onSuccess: () => void;
};

const categoryOptions = [
  { key: "frontend", value: "Frontend" },
  { key: "backend", value: "Backend" },
  { key: "management", value: "Management" },
  { key: "conversation", value: "Conversation" },
  { key: "team collaboration", value: "Team Collaboration" },
  { key: "design", value: "Design" },
];

export function AddAssignmentForm({ cohortId, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentSelection, setCurrentSelection] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      await addAssignmentAction(formData, cohortId, selectedItems);
      onSuccess();
    } catch (error) {
      console.error("Failed to create assignment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    if (currentSelection && !selectedItems.includes(currentSelection)) {
      setSelectedItems([...selectedItems, currentSelection]);
      setCurrentSelection("");
    }
  };
  const handleRemove = (itemToRemove: string) => {
    setSelectedItems(selectedItems.filter((item) => item !== itemToRemove));
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
      <div>
        <Label htmlFor="categories">Category</Label>
        <div className="flex">
          <Select value={currentSelection} onValueChange={setCurrentSelection}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Cohorts</SelectLabel>
                {categoryOptions.map((category) => (
                  <SelectItem
                    key={category.key}
                    value={category.key}
                    className="cursor-pointer"
                  >
                    {category.value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={handleAdd}
            className="ml-2"
            type="button"
          >
            <Plus />
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {selectedItems.map((item) => (
          <div
            key={item}
            className="flex flex-row justify-center items-center bg-gray-100 mx-1 px-2 rounded-md mb-2"
          >
            <span className="text-xs capitalize">{item}</span>
            <Button
              className="ml-1 text-xs p-1"
              variant="ghost"
              onClick={() => handleRemove(item)}
            >
              ✕
            </Button>
          </div>
        ))}
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
