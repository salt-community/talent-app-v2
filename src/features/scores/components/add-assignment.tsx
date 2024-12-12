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
import { addAssigmentAction } from "../actions";


export function AddAssignment() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil
          type="submit"
          size={16}
          className="cursor-pointer hover:text-gray-600"
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
                name="teamCollaboration"
                className="col-span-3 border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-gray-200 focus:outline-none"
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
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="frontend"
                    value="frontend"
                    id="frontend"
                    className="focus:ring focus:ring-gray-200"
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
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
