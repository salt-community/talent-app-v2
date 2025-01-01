import Form from "next/form";
import { updateMeilisearchSettingsAction } from "../../action";
import { LoadingButton } from "./loading-button";
import { H3 } from "@/components";
import { adminService } from "../../instance";

export async function MeiliConfiguration() {
  const settings = await adminService.getMeilisearchSettings();

  return (
    <div className="space-y-4">
      <H3>Meilisearch Settings</H3>
      <Form action={updateMeilisearchSettingsAction}>
        <LoadingButton text="Update" loadingText="Saving settings..." />
      </Form>
    </div>
  );
}
