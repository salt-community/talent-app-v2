import { DeveloperProfileInsert } from "./schema";
import { insecureDeveloperProfilesService } from "./instance";
import { IdentitySelect } from "../iam";

export async function seedDeveloperProfiles(identities: IdentitySelect[]) {
  console.log("Seeding developer profiles...");

  const developers: DeveloperProfileInsert[] = [];
  for (const identity of identities) {
    developers.push({
      identityId: identity.id,
      name: identity.name,
      email: identity.email,
    });
  }

  const developerProfileIds: string[] = [];

  for (const developer of developers) {
    developerProfileIds.push(
      (await insecureDeveloperProfilesService.add(developer)).id
    );
  }

  for (let i = 0; i < developerProfileIds.length; i++) {
    const id = developerProfileIds[i];
    const status = i < 5 ? ("highlighted" as const) : ("published" as const);

    await insecureDeveloperProfilesService.updateStatus({ id, status });
  }

  console.log("Done seeding developer profiles!");

  return developerProfileIds;
}
