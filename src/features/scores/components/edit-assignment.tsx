"use client";
import { Pencil } from "lucide-react";
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

import { Assignment } from "../types";
import { useState } from "react";

import { InputField } from "./input-field";
import { FormTextArea } from "./form-text-area";
import { CheckboxBoard } from "./checkbox-board";
import { editAssignmentAction } from "../actions";
import type { CategoryTag } from "../categories";
//import { useDebouncedCallback } from 'use-debounce';

type Props = {
  assignment: Assignment;
};

export function EditAssignment({ assignment }: Props) {
  const [score, setScore] = useState(assignment.score);
  const [title, setTitle] = useState(assignment.title);
  const [comment, setComment] = useState(assignment.comment);
  const [tags, setTags] = useState(assignment.tags);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChangeTag = (isChecked: boolean, tag: CategoryTag) => {
    if (isChecked) {
      setTags([...tags, tag]);
    } else {
      setTags(tags.filter((currentTag) => currentTag !== tag));
    }
  };
  const handleChangeInput = (inputValue: string, label: string) => {
    if (label === "Title") setTitle(inputValue);
    if (label === "Score") setScore(Number(inputValue));
    if (label === "Comment") setComment(inputValue);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Pencil
          type="submit"
          size={20}
          strokeWidth={2.5}
          className="cursor-pointer hover:text-gray-600"
          onClick={() => setIsDialogOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white border border-gray-300 rounded-md shadow-md">
        <DialogHeader>
          <DialogTitle className="text-gray-800 text-lg font-semibold">
            Edit {assignment.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Alter the details below to edit the assignment.
          </DialogDescription>
        </DialogHeader>
        <form action={editAssignmentAction} className="space-y-4">
          <input type="hidden" name="assignmentId" value={assignment.id} />
          <input type="hidden" name="devId" value={assignment.devId} />
          <div className="grid gap-4">
            <InputField
              label="Title"
              inputType="text"
              value={title}
              handleChangeInput={handleChangeInput}
            />
            <InputField
              label="Score"
              inputType="number"
              value={score}
              handleChangeInput={handleChangeInput}
            />
            <FormTextArea
              label="Comment"
              value={comment}
              handleChangeInput={handleChangeInput}
            />
            <CheckboxBoard tags={tags} handleChangeTag={handleChangeTag} />
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
