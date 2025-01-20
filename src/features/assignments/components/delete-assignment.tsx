import { Button } from "@/components";
import { AlertDialogDemo } from "@/components/alert-dialog/alertDialog";
import React from "react";
import { deleteAssignmentAction } from "../actions";

type Props = {
    id: number;
}

export default function DeleteAssignment({ id } : Props) {
  return (
    <AlertDialogDemo
      title={"Are you sure?"}
      description={"This will delete your assignment!"}
      onConfirm={() => deleteAssignmentAction(id)}
    >
      <Button className="w-full">Delete</Button>
    </AlertDialogDemo>
  );
}
