"use client";
import { useState } from "react";
import { SynonymDialog } from "./synonym-dialog";
import { Button } from "@/components";
import { Synonym } from "../../types";
import { Pencil, Trash } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Props = { synonyms: [string, string[]][] };
export function MeiliSynonyms({ synonyms }: Props) {
  const [currentSynonyms, setCurrentSynonyms] = useState(synonyms);

  return (
    <div className="py-8 p-4 spacy">
      <span className="font-bold">Synonyms:</span>
      <div className="p-2 space-y-2 w-full md:w-96">
        <input
          hidden
          name="synonyms"
          defaultValue={JSON.stringify(currentSynonyms)}
        />
        {currentSynonyms.length > 0 ? (
          currentSynonyms.map((synonym) => (
            <MeiliSynonym
              key={synonym[0] + synonym[1].join(",")}
              synonym={synonym}
              onSynonymChange={(updatedSynonym) =>
                setCurrentSynonyms((prev) =>
                  prev.map((s) => (s === synonym ? updatedSynonym : s)),
                )
              }
              onRemove={() => {
                const synonyms = currentSynonyms.filter((s) => s !== synonym);
                setCurrentSynonyms(synonyms);
              }}
            />
          ))
        ) : (
          <span className="text-gray-500">No synonyms yet</span>
        )}
        <div className="flex justify-end">
          <SynonymDialog
            onSynonymChange={(synonym) => {
              if (currentSynonyms.some((s) => s[0] === synonym[0])) {
                toast({
                  variant: "destructive",
                  description: "Synonym already exists, edit it instead",
                });
              } else setCurrentSynonyms((prev) => [...prev, synonym]);
            }}
            title={"Add synonym"}
            description={"Add a new synonym and its pairs"}
            buttonText={"Add"}
          >
            <Button size="sm">Add synonyms</Button>
          </SynonymDialog>
        </div>
        {JSON.stringify(synonyms.toSorted()) !==
          JSON.stringify(currentSynonyms.toSorted()) && (
          <span>Please, update the synonyms</span>
        )}
      </div>
    </div>
  );
}

function MeiliSynonym({
  synonym,
  onSynonymChange,
  onRemove,
}: {
  synonym: Synonym;
  onSynonymChange: (synonym: Synonym) => void;
  onRemove: () => void;
}) {
  const [word, pairs] = synonym;
  return (
    <div className="border rounded-md p-2 flex gap-4 justify-between items-center">
      <div>
        <label className="font-bold">{word}: </label>
        {pairs.map((synonym) => (
          <label
            key={synonym}
            className="text-sm text-gray-500 border rounded-full px-2 py-1"
          >
            {synonym}
          </label>
        ))}
      </div>
      <div className="flex gap">
        <SynonymDialog
          meiliSynonym={synonym}
          onSynonymChange={onSynonymChange}
          title={"Edit synonym"}
          description={"Edit the synonym and its pairs"}
          buttonText={"Update"}
        >
          <Button size="icon" variant="ghost">
            <Pencil size={20} strokeWidth={2.5} />
          </Button>
        </SynonymDialog>
        <Button size="icon" variant="ghost" onClick={onRemove}>
          <Trash size={20} strokeWidth={2.5} />
        </Button>
      </div>
    </div>
  );
}
