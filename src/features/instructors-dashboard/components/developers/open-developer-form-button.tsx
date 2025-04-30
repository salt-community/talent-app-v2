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
import { Developer } from "../../types";
import { AddDeveloperForm } from "./add-developer-form";

type Props = {
  cohortId: string;
  developer: Developer[];
};

export function AddDeveloperButton({ cohortId, developer }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="cursor-pointer">
          <Button onClick={() => setOpen(true)}>
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
