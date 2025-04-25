"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
  onConfirm: () => void;
  onOpenChange?: (open: boolean) => void;
};

export function AlertDialogDemo({
  title,
  description,
  children,
  onConfirm,
  onOpenChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpenState: boolean) => {
    setOpen(newOpenState);


    if (onOpenChange) {
      onOpenChange(newOpenState);
    }
  };

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="cursor-pointer">
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}