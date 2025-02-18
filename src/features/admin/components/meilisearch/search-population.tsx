import { LoadingButton } from "./loading-button";
import {
  repopulateMeilisearchAction,
  syncMeilisearchAction,
} from "../../action";
import Form from "next/form";
import { Button, H3 } from "@/components";
import { adminService } from "../../instance";

export const maxDuration = 180;

export async function MeiliPopulation() {
  const needToSync = await adminService.doesSearchNeedSync();

  return (
    <div className="space-y-4">
      <H3>Meilisearch Population</H3>
      <div className="flex gap-4">
        <Form action={repopulateMeilisearchAction}>
          <LoadingButton
            text="Repopulate"
            loadingText="Repopulating..."
          />
        </Form>
        <Form action={syncMeilisearchAction}>
          {needToSync ? (
            <LoadingButton
              text="Update"
              loadingText="Updating..."
            />
          ) : (
            <Button disabled>Update</Button>
          )}
        </Form>
      </div>
    </div>
  );
}
