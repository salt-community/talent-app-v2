"use client";

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

import { useState, useEffect, useActionState } from "react";
import { InputField } from "./input-field";
import { FormTextArea } from "./form-text-area";
import { CheckboxBoard } from "./checkbox-board";
import { addAssignmentAction } from "../actions";
import { Plus } from "lucide-react";
import type { CategoryTag } from "../categories";

type Props = { devId: string };

export function AddAssignment({ devId }: Props) {
  const [state, action] = useActionState(addAssignmentAction, undefined);
  const [tags, setTags] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [score, setScore] = useState("");
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
        Number(score) <= 100,
    );
  }, [title, score]);

  useEffect(() => {
    if (state?.errorMessage) {
      setIsDialogOpen(true);
    } else {
      setIsDialogOpen(false);
    }
  }, [state?.errorMessage]);

  useEffect(() => {
    setTags(state?.newAssignment.tags || []);
  }, [state?.newAssignment.tags]);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          setIsDialogOpen(false);
          setTitle("");
          setScore("");
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer flex gap-1 justify-center items-center mt-2 mb-4"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="text-primary font-semibold" size={18} />
          <p className="font-semibold">Add assignment</p>
        </Button>
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
        <form action={action} className="space-y-4">
          <input type="hidden" name="devId" value={devId} />
          <div className="grid gap-4">
            <InputField
              label="Title"
              inputType="text"
              handleChangeInput={handleChangeInput}
              defaultValue={state?.newAssignment.title}
            />
            <InputField
              label="Score"
              inputType="number"
              handleChangeInput={handleChangeInput}
              defaultValue={state?.newAssignment.score.toString()}
            />
            <FormTextArea
              label="Comment"
              defaultValue={state?.newAssignment.comment}
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
                  setTitle("");
                  setScore("");
                }
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
          {state?.errorMessage && (
            <p className="text-red-600">{state.errorMessage}</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
