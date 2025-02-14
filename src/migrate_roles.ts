import { db, iamService } from "./features";

async function main() {
  const allIndentities = await iamService.getAllIdentities();

  for (const identity of allIndentities) {
    await iamService.updateRole(identity.id, identity.role);
  }
  await db.$client.end();
}
main();
