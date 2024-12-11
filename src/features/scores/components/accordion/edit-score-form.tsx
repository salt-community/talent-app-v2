/* "use client";
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
import { addAssigmentAction } from "../../actions";
import { useState } from "react";
import { Scores } from "../../types";
import { AddAssignment } from "../add-assignment";

type Props = {
  scores: Scores;
};
export function EditScoreForm({ scores: scores }: Props) {
  const [frontendValue, setFrontendValue] = useState(scores.frontend);
  const [backendValue, setBackendValue] = useState(scores.backend);
  const [teamCollaborationValue, setTeamCollaborationValue] = useState(
    scores.teamCollaboration
  );
  const [designValue, setDesignValue] = useState(scores.design);
  const [individualComunicationValue, setIndividualComunicationValue] =
    useState(scores.individualCommunication);
  const [managementValue, setManagementValue] = useState(
    scores.management
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil type="submit" size={16} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit scores</DialogTitle>
          <DialogDescription>
            Make changes to the developers scores here. Click save when you´re
            done.
          </DialogDescription>
        </DialogHeader>
        <form action={addAssigmentAction}>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
 */