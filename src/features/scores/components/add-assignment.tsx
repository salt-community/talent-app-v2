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

import {  useState } from "react";
import { InputField } from "./input-field";
import { FormTextArea } from "./form-text-area";
import { CheckboxBoard } from "./checkbox-board";
import { addAssignmentAction } from "../actions";
import { Plus } from "lucide-react";

type Props = { devId: string };

export function AddAssignment({ devId }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const handleChangeInput = (inputValue: string, label: string) => {
    if (label === "Title") setTitle(inputValue);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          setTitle("");
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
        <form action={addAssignmentAction} className="space-y-4">
          <input type="hidden" name="devId" value={devId} />
          <div className="grid gap-4">
            <InputField
              label="Title"
              inputType="text"
              handleChangeInput={handleChangeInput}
            />
            <InputField label="Score" inputType="number" />
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
