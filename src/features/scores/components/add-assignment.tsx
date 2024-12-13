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
import { categoryTags } from '../categories';
import { InputField } from './input-field';
import { FormTextArea } from './form-text-area';
import { FormLabel } from './form-label';

export function AddAssignment() {
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
            <InputField label="Title" inputType="text" handleChangeTitle={setTitle} />
            <InputField label="Score" inputType="number" />
            <FormTextArea label="Comment" />
            <div className="grid grid-cols-4 items-start gap-4">
              <FormLabel label="Tags" />
              <div className="col-span-3 grid grid-cols-2 gap-2">
                {categoryTags.map((tag, index) => {
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
