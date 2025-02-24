import Form from "next/form";
import { updateMeilisearchSettingsAction as updateSearchSettingsAction } from "../../action";
import { LoadingButton } from "./loading-button";
import { H3 } from "@/components";
import { adminService } from "../../instance";
import { SearchSynonyms } from "./search-synonyms";

export async function SearchSettings() {
  const settings = await adminService.getSearchSettings();

  const synonyms = Object.entries(settings.synonyms ?? {});
  return (
    <div className="space-y-4">
      <H3>Settings</H3>
      <Form action={updateSearchSettingsAction}>
        <SearchSynonyms synonyms={synonyms} />
        <LoadingButton text="Update" loadingText="Saving settings..." />
      </Form>
    </div>
  );
}
