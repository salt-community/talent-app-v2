"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addAssignmentAction } from "../../action";
import { DialogTitle } from "@/components/ui/dialog";
import { Assignment } from "../../types";

const DEFAULT_CATEGORIES = [
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "management", name: "Management" },
  { id: "conversation", name: "Conversation" },
  { id: "team collaboration", name: "Team Collaboration" },
  { id: "design", name: "Design" },
];

type Props = {
  cohortId: string;
  assignment?: Assignment;
  onSuccess: () => void;
};

export function AddAssignmentForm({
  cohortId,
  assignment = undefined,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(
    assignment?.categories?.map((category) => ({
      id: category,
      name: category,
    })) || []
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState(assignment?.title || "");

  const handleSelectCategory = (category: { id: string; name: string }) => {
    if (!selectedCategories.find((c) => c.id === category.id)) {
      setSelectedCategories([...selectedCategories, category]);
    }
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleAddCustomCategory = () => {
    if (!searchTerm.trim()) return;

    const customId = searchTerm.toLowerCase().replace(/\s+/g, "-");

    if (!selectedCategories.find((c) => c.id === customId)) {
      const newCategory = { id: customId, name: searchTerm.trim() };
      setSelectedCategories([...selectedCategories, newCategory]);
    }

    setIsOpen(false);
    setSearchTerm("");
  };

  const handleRemoveCategory = (categoryId: string) => {
    setSelectedCategories(
      selectedCategories.filter((cat) => cat.id !== categoryId)
    );
  };

  const filteredCategories = DEFAULT_CATEGORIES.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedCategories.find((c) => c.id === category.id)
  );

  const showAddCustomOption =
    searchTerm.trim() !== "" &&
    !filteredCategories.some(
      (cat) => cat.name.toLowerCase() === searchTerm.toLowerCase()
    ) &&
    !selectedCategories.some(
      (cat) => cat.name.toLowerCase() === searchTerm.toLowerCase()
    );

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const categories = selectedCategories.map((cat) => cat.id);
      if (assignment) {
      } else
        await addAssignmentAction(cohortId, title, categories);
      onSuccess();
    } catch (error) {
      console.error("Failed to create assignment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchTerm) {
      e.preventDefault();
      handleAddCustomCategory();
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 150);
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

      <div>
        <Label htmlFor="categories">Categories</Label>
        <div className="relative">
          <div
            className="border rounded-md p-2 flex items-center justify-between cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <input
              type="text"
              placeholder="Select or create categories..."
              className="outline-hidden w-full cursor-pointer"
              value={searchTerm}
              onChange={(e) => {
                e.stopPropagation();
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
              onKeyDown={handleKeyDown}
              onBlur={handleInputBlur}
            />
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
            />
          </div>
          {isOpen && (
            <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
              {filteredCategories.length > 0 && (
                <>
                  {filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSelectCategory(category);
                      }}
                    >
                      {category.name}
                    </div>
                  ))}
                </>
              )}

              {showAddCustomOption && (
                <div
                  className="p-2 hover:bg-blue-50 cursor-pointer border-t flex items-center"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleAddCustomCategory();
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add &quot;{searchTerm}&quot; as new category
                </div>
              )}

              {filteredCategories.length === 0 && !showAddCustomOption && (
                <div className="p-2 text-gray-500">
                  {searchTerm
                    ? "Type to add a custom category"
                    : "No categories found"}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedCategories.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Selected Categories:</div>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center bg-gray-100 px-3 py-1 rounded-md"
              >
                <span className="text-sm">{category.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(category.id)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

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
