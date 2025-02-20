"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AddDeveloperForm } from "./add-developer-form";
import { Developer } from "../../types";

type Props = {
  cohortId: string;
  developer: Developer;
};

export default function AddDeveloperButton({ cohortId, developer }: Props) {
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
          <AddDeveloperForm
            developer={developer}
            cohortId={cohortId}
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
