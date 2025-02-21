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
import { AddDeveloperForm } from "./add-developer-form";
import { Developer } from "../../types";

type Props = {
  cohortId: string;w
  developer: Developer;
};

export default function AddDeveloperButton({ cohortId, developer }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-zinc-900 text-white rounded-md h-10 px-4 hover:bg-zinc-800 my-2"
            onClick={() => setOpen(true)}
          >
            <span>+</span> New developer
          </Button>
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
