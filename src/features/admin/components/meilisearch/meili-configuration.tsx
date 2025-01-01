import Form from "next/form";
import { updateMeilisearchSettingsAction } from "../../action";
import { LoadingButton } from "./loading-button";
import { H3 } from "@/components";
import { adminService } from "../../instance";
import { MeiliSynonyms } from "./meili-synonyms";

export async function MeiliSettings() {
  const settings = await adminService.getMeilisearchSettings();

  const synonyms = Object.entries(settings.synonyms ?? {});
  return (
    <div className="space-y-4">
      <H3>Meilisearch Settings</H3>
      <Form action={updateMeilisearchSettingsAction}>
        <MeiliSynonyms synonyms={synonyms} />
        <LoadingButton text="Update" loadingText="Saving settings..." />
      </Form>
    </div>
  );
}
