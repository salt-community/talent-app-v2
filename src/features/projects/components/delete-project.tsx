import { AlertDialogDemo, Button } from "@/components";
import React from "react";

type Props = {
  onClick: () => void;
};

export default function DeleteProject({ onClick }: Props) {
  return (
    <AlertDialogDemo
      title={"Are you sure?"}
      description={"This will delete your project!"}
      onConfirm={onClick}
    >
      <Button>Delete</Button>
    </AlertDialogDemo>
  );
}
