import { backgroundsService } from "@/features/backgrounds/instance";
import { meiliSearch } from "./meili-search";

export async function seedMeili() {
  const backgrounds = await backgroundsService.getAll();

  const index = meiliSearch.index("backgrounds");

  const result = await index.addDocuments(backgrounds);

  const task = await meiliSearch.waitForTask(result.taskUid);

  if (task.status === "succeeded") {
    console.log("Successfully seeded MeiliSearch index with backgrounds");
  } else {
    console.error(
      `Failed to seed MeiliSearch index with backgrounds because of errorz: ${task.status}`,
    );
  }
}
