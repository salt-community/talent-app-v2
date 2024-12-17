import { meiliSearch } from "./meili-search";

export async function addBackgroundSearchIndex(
  background: Record<string, unknown>[]
) {
  const index = meiliSearch.index("backgrounds");
  try {
    const response = await index.addDocuments(background, {
      primaryKey: "devId",
    });
    const task = await meiliSearch.waitForTask(response.taskUid);
    if (task.status === "succeeded") {
      console.log(
        `Successfully seeded MeiliSearch index with ${task.details.indexedDocuments} backgrounds`
      );
    } else {
      console.error(
        `${task.status}: failed to seed MeiliSearch index with backgrounds because of errorzzz: ${task.error?.message}`
      );
    }
    console.log("Resource added to Meilisearch:", response);
  } catch (error) {
    console.error("Error adding resource to Meilisearch:", error);
  }
}
