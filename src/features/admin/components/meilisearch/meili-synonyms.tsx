import { Button } from "@/components";

type Props = { synonyms?: [string, string[]][] };
export function MeiliSynonyms({ synonyms }: Props) {
  return (
    <div className="p-2">
      <span className="font-bold">Synonyms:</span>
      <div className="p-2 space-y-2">
        {synonyms && synonyms.length > 0 ? (
          synonyms.map(([synonym, pairs]) => (
            <div>
              {synonym}: {pairs.join(", ")}
            </div>
          ))
        ) : (
          <span className="text-gray-500">No synonyms yet</span>
        )}
      </div>
    </div>
  );
}
