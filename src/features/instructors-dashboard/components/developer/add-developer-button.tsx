"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  Separator,
} from "@/components";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function AddDeveloperButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="" onClick={() => setOpen(true)}>
            <span>+</span> New Developer
          </button>
        </DialogTrigger>
        <VisuallyHidden>
          <DialogTitle>New Developer</DialogTitle>
        </VisuallyHidden>
        <DialogContent>
          {/*
          add form here to add developer
          /> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
