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

type Props = {
    assignment: Assignment
}


export function EditAssignment({ assignment }: Props) {
    const [score, setScore] = useState(assignment.score);
    const [title, setTitle] = useState(assignment.title);
    const [comment, setComment] = useState(assignment.comment);
    const [tags, setTags] = useState(assignment.tags);
    const [isDialogOpen, setIsDialogOpen] = useState(false); 
    //import { useDebouncedCallback } from 'use-debounce';

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
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
                value={!comment ? "" : comment}
                onChange={(e) => setComment(e.target.value)}
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
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="frontend"
                    value="frontend"
                    id="frontend"
                    className="focus:ring focus:ring-gray-200"
                    checked={tags.includes("Frontend")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTags([...tags, "Frontend"]);
                      } else {
                        setTags(tags.filter((tag) => tag !== "Frontend"));
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
                    checked={tags.includes("Backend")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTags([...tags, "Backend"]);
                      } else {
                        setTags(tags.filter((tag) => tag !== "Backend"));
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
                    checked={tags.includes("Conversation")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTags([...tags, "Conversation"]);
                      } else {
                        setTags(tags.filter((tag) => tag !== "Conversation"));
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
                    checked={tags.includes("Team collaboration")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTags([...tags, "Team collaboration"]);
                      } else {
                        setTags(tags.filter((tag) => tag !== "Team collaboration"));
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
                    checked={tags.includes("Design")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTags([...tags, "Design"]);
                      } else {
                        setTags(tags.filter((tag) => tag !== "Design"));
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
                    checked={tags.includes("Management")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTags([...tags, "Management"]);
                      } else {
                        setTags(tags.filter((tag) => tag !== "Management"));
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
