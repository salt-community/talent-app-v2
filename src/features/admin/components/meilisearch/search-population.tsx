import { LoadingButton } from "./loading-button";
import {
  repopulateMeilisearchAction,
  syncMeilisearchAction,
} from "../../action";
import Form from "next/form";
import { Button, H3 } from "@/components";
import { adminService } from "../../instance";

export async function MeiliPopulation() {
  const needToSync = await adminService.doesSearchNeedSync();

  return (
    <div className="space-y-4">
      <H3>Meilisearch Population</H3>
      <div className="flex gap-4">
        <Form action={repopulateMeilisearchAction}>
          <LoadingButton
            text="Repopulate Meilisearch"
            loadingText="Repopulating..."
          />
        </Form>
        <Form action={syncMeilisearchAction}>
          {needToSync ? (
            <LoadingButton
              text="Update Meilisearch"
              loadingText="Updating..."
            />
          ) : (
            <Button disabled>Update Meilisearch</Button>
          )}
        </Form>
      </div>
    </div>
  );
}
