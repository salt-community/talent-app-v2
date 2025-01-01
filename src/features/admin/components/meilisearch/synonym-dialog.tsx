"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@/components";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Synonym } from "../../types";

type Props = {
  title: string;
  description: string;
  buttonText: string;
  onSynonymChange: (synonym: Synonym) => void;
  meiliSynonym: Synonym | undefined;
  children: React.ReactNode;
};
export function SynonymDialog({
  title,
  description,
  buttonText,
  onSynonymChange,
  meiliSynonym,
  children,
}: Props) {
  const [synonym, setSynonym] = useState(meiliSynonym?.[0] || "");
  const [synonymPairs, setSynonymPairs] = useState(meiliSynonym?.[1] || []);

  const handleOnClick = () => {
    const pairs = synonymPairs
      .map((synonym) => synonym.trim())
      .filter((synonym) => synonym.length > 0);
    if (synonym && pairs.length > 0) {
      onSynonymChange([synonym, pairs]);
      setSynonym("");
      setSynonymPairs([]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Synonym"
            value={synonym}
            onChange={(e) => setSynonym(e.target.value.trim())}
          />
          <Input
            type="text"
            placeholder="Synonyms separated by commas"
            disabled={synonym?.[0] === undefined}
            value={synonymPairs.join(",")}
            onChange={(e) => setSynonymPairs(e.target.value.split(","))}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="w-full"
              onClick={handleOnClick}
              disabled={synonym.length === 0 || synonymPairs.length === 0}
            >
              {buttonText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
