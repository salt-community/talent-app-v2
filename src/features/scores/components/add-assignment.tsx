"use client";

import { ClipboardPlus } from "lucide-react";
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

import { useState } from "react";
import { InputField } from "./input-field";
import { FormTextArea } from "./form-text-area";
import { CheckboxBoard } from "./checkbox-board";
import { addAssignmentAction } from "../actions";

export function AddAssignment() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleChangeInput = (inputValue: string, label: string) => {
    if (label === "Title") setTitle(inputValue);
  };

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
        <form action={addAssignmentAction} className="space-y-4">
          <div className="grid gap-4">
            <InputField
              label="Title"
              inputType="text"
              handleChangeInput={handleChangeInput}
            />
            <InputField 
              label="Score" 
              inputType="number" 
            />
            <FormTextArea label="Comment" />
            <CheckboxBoard />
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
