type Props = { synonyms?: [string, string[]][] };
export function MeiliSynonyms({ synonyms }: Props) {
  return (
    <div>
      <h3>Meilisearch Synonyms</h3>
      <div>
        <h4>Current Synonyms</h4>
        <div>
          {synonyms &&
            synonyms.length > 0 &&
            synonyms.map((synonym) => <div>synonym</div>)}
        </div>
      </div>
    </div>
  );
}
