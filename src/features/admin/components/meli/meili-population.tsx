import { LoadingButton } from "./loading-button";
import { repopulateMeilisearchAction } from "../../action";
import Form from "next/form";

export function MeiliPopulation() {
  return (
    <div className="flex gap-4">
      <Form action={repopulateMeilisearchAction}>
        <LoadingButton
          text="Repopulate Meilisearch"
          loadingText="Repopulating..."
        />
      </Form>
      <Form action={repopulateMeilisearchAction}>
        <LoadingButton text="Update Meilisearch" loadingText="Updating..." />
      </Form>
    </div>
  );
}
