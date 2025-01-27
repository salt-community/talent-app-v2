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

import { Assignment, AssignmentScore } from "../types";
import { useActionState, useEffect, useState } from "react";
import { InputField } from "./input-field";
import { FormTextArea } from "./form-text-area";
import { CheckboxBoard } from "./checkbox-board";
import type { CategoryTag } from "../categories";
// import DeleteAssignment from "./delete-assignment";
import { editAssignmentAction } from "../actions";

type Props = {
  assignment: Assignment;
  assignmentScore: AssignmentScore;
};

export function EditAssignment({ assignment, assignmentScore }: Props) {
  const [state, action] = useActionState(editAssignmentAction, undefined);
  const [score, setScore] = useState(assignmentScore.score.toString());
  const [title, setTitle] = useState(assignment.title);
  const [tags, setTags] = useState(assignment.tags || []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChangeTag = (isChecked: boolean, tag: CategoryTag) => {
    if (isChecked) {
      setTags([...tags, tag]);
    } else {
      setTags(tags.filter((currentTag) => currentTag !== tag));
    }
  };

  const handleChangeInput = (inputValue: string, label: string) => {
    if (label === "Title") setTitle(inputValue);
    if (label === "Score") setScore(inputValue);
  };

  useEffect(() => {
    setIsFormValid(
      title.trim() !== "" &&
        score.trim() !== "" &&
        !isNaN(Number(score)) &&
        Number(score) >= 0 &&
        Number(score) <= 100
    );
  }, [title, score]);

  useEffect(() => {
    if (state?.errorMessages) {
      setIsDialogOpen(true);
    } else {
      setIsDialogOpen(false);
    }
  }, [state?.errorMessages]);

  useEffect(() => {
    if (state?.newAssignment && state.newAssignment.tags !== tags) {
      setTags(state.newAssignment.tags || []);
    }
  }, [state?.newAssignment, tags]);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          setIsDialogOpen(false);
        }
      }}
    >
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
        <form action={action} className="space-y-4">
          <input type="hidden" name="assignmentId" value={assignment.id} />
          <div className="grid gap-4">
            <InputField
              label="Title"
              inputType="text"
              errorMessage={state?.errorMessages?.titleError}
              handleChangeInput={handleChangeInput}
            />
            <InputField
              label="Score"
              inputType="number"
              errorMessage={state?.errorMessages?.titleError}
              handleChangeInput={handleChangeInput}
            />
            <FormTextArea
              label="Comment"
              handleChangeInput={handleChangeInput}
            />
            <CheckboxBoard tags={tags} handleChangeTag={handleChangeTag} />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full"
              onClick={() => {
                if (isFormValid) {
                  setIsDialogOpen(false);
                }
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
          {/* <DeleteAssignment id={assignment.id} /> */}
          {state?.errorMessages ? (
            <p className="text-red-600 font-bold h-6">
              Form error. Please make the necessary changes.
            </p>
          ) : (
            <p className="h-6"></p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
