"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  Button,
} from "@/components";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Edit } from "lucide-react";

export default function EditAssignmentButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="hover:text-green-600"
            aria-label="Edit"
          >
            <Edit size={18} />
          </Button>
        </DialogTrigger>
        <VisuallyHidden>
          <DialogTitle>Edit Assignment</DialogTitle>
        </VisuallyHidden>
        <DialogContent></DialogContent>
      </Dialog>
    </>
  );
}
