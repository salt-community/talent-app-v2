"use client";

import { ClipboardPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addAssigmentAction } from "../actions";
import { useState } from 'react';
import { CategoryCheckbox } from './category-checkbox';


export function AddAssignment() {
  const allTags = ["frontend", "backend", "conversation", "team collaboration", "design", "management"];
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");

  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <ClipboardPlus
          type="submit"
          size={16}
          className="cursor-pointer hover:text-gray-600"
          onClick={() => setIsDialogOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white border border-gray-300 rounded-md shadow-md">
        <DialogHeader>
          <DialogTitle className="text-gray-800 text-lg font-semibold">
            Add New Assignment
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Fill out the details below to add a new assignment.
          </DialogDescription>
        </DialogHeader>
        <form action={addAssigmentAction} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="title"
                className="text-right text-sm text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                className="col-span-3 border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-gray-200 focus:outline-none"
                onChange={(e) => (setTitle(e.target.value))}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="score"
                className="text-right text-sm text-gray-700"
              >
                Score
              </label>
              <input
                type="number"
                min="0"
                max="100"
                name="score"
                className="col-span-3 border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-gray-200 focus:outline-none"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label
                htmlFor="comment"
                className="text-right text-sm text-gray-700 mt-1"
              >
                Comments
              </label>
              <textarea
                name="comment"
                className="col-span-3 border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-gray-200 focus:outline-none resize-none"
                rows={3}
                style={{ maxHeight: "150px", overflowY: "auto" }}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label
                htmlFor="Tags"
                className="text-right text-sm text-gray-700 mt-1"
              >
                Tags
              </label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                {allTags.map((tag, index) => {
                  return <CategoryCheckbox key={index} label={tag}/>
                })}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-gray-800 text-white hover:bg-gray-700 text-sm px-4 py-2 rounded-md"
              onClick={() => setIsDialogOpen(false)}
              disabled={title.length === 0}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
