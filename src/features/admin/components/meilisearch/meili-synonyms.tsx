"use client";
import { useState } from "react";
import { SynonymDialog } from "./synonym-dialog";
import { Button } from "@/components";
import { Synonym } from "../../types";
import { Pencil, Trash } from "lucide-react";

type Props = { synonyms: [string, string[]][] };
export function MeiliSynonyms({ synonyms }: Props) {
  const [currentSynonyms, setCurrentSynonyms] = useState(synonyms);

  const handleSynonymChange = (synonym: [string, string[]]) => {
    const synonyms = currentSynonyms.filter(([s]) => s !== synonym[0]);
    setCurrentSynonyms([...synonyms, synonym]);
  };

  return (
    <div className="py-8 p-4">
      <span className="font-bold">Synonyms:</span>
      <div className="p-2 space-y-2 w-fit">
        {currentSynonyms.length > 0 ? (
          currentSynonyms.map((synonym) => (
            <MeiliSynonym
              key={synonym[0] + synonym[1].join(",")}
              synonym={synonym}
              onSynonymChange={handleSynonymChange}
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
            meiliSynonym={undefined}
            onSynonymChange={handleSynonymChange}
            title={"Add synonym"}
            description={"Add a new synonym and its pairs"}
            buttonText={"Add"}
          >
            <Button size="sm">Add synonyms</Button>
          </SynonymDialog>
        </div>
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
  return (
    <div className="border rounded-md p-2 flex gap-4 justify-between items-center w-full md:w-96">
      {synonym[0]}: {synonym[1].join(", ")}
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
