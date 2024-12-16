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
import { editAssigmentAction } from "../actions";
import { Assignment } from "../types";
import { useState } from "react";

import { InputField } from "./input-field";
import { FormTextArea } from "./form-text-area";
import { FormLabel } from "./form-label";
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
          size={16}
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
        <form action={editAssigmentAction} className="space-y-4">
          <input type="hidden" name="assignmentId" value={assignment.id} />
          <input type="hidden" name="userId" value={assignment.userId} />
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
            <div className="grid grid-cols-4 items-start gap-4">
              <FormLabel label="Tags" />
              <div className="col-span-3 grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="frontend"
                    value="frontend"
                    id="frontend"
                    className="focus:ring focus:ring-gray-200"
                    checked={tags.includes("frontend")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTags([...tags, "frontend"]);
                      } else {
                        setTags(tags.filter((tag) => tag !== "frontend"));
                      }
                    }}
                  />
                  <label
                    htmlFor="frontend"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Frontend
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="backend"
                    value="backend"
                    id="backend"
                    className="focus:ring focus:ring-gray-200"
                    checked={tags.includes("backend")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTags([...tags, "backend"]);
                      } else {
                        setTags(tags.filter((tag) => tag !== "backend"));
                      }
                    }}
                  />
                  <label
                    htmlFor="backend"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Backend
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="conversation"
                    value="conversation"
                    id="conversation"
                    className="focus:ring focus:ring-gray-200"
                    checked={tags.includes("conversation")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTags([...tags, "conversation"]);
                      } else {
                        setTags(tags.filter((tag) => tag !== "conversation"));
                      }
                    }}
                  />
                  <label
                    htmlFor="conversation"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Conversation
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="teamCollaboration"
                    value="teamCollaboration"
                    id="teamCollaboration"
                    className="focus:ring focus:ring-gray-200"
                    checked={tags.includes("teamCollaboration")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTags([...tags, "teamCollaboration"]);
                      } else {
                        setTags(
                          tags.filter((tag) => tag !== "teamCollaboration"),
                        );
                      }
                    }}
                  />
                  <label
                    htmlFor="teamCollaboration"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Team Collaboration
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="design"
                    value="design"
                    id="design"
                    className="focus:ring focus:ring-gray-200"
                    checked={tags.includes("design")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTags([...tags, "design"]);
                      } else {
                        setTags(tags.filter((tag) => tag !== "design"));
                      }
                    }}
                  />
                  <label
                    htmlFor="design"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Design
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="management"
                    value="management"
                    id="management"
                    className="focus:ring focus:ring-gray-200"
                    checked={tags.includes("management")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTags([...tags, "management"]);
                      } else {
                        setTags(tags.filter((tag) => tag !== "management"));
                      }
                    }}
                  />
                  <label
                    htmlFor="management"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Management
                  </label>
                </div>
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
