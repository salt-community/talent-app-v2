import { Button } from "@/components";
import { errorHandler } from "@/lib";
import { addDeveloperProfileAction } from "../actions";
import { revalidatePath } from "next/cache";

interface Props {
  identityid: string;
}

export function CreateProfileButton({ identityid }: Props) {
  async function addProfile() {
    "use server";

    try {
      await addDeveloperProfileAction(identityid);
      revalidatePath("/profile");
    } catch (error) {
      errorHandler(error);
    }
  }

  return <Button onClick={addProfile}>Create new profile</Button>;
}
