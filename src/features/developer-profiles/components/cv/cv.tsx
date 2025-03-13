import { developerProfilesService } from "../../instance";
import { CvContainer } from "./cv-container";

type Props = {
  developerProfileId: string;
  hasProfileAccess: boolean;
};

export async function CV({ developerProfileId, hasProfileAccess }: Props) {
  const background =
    await developerProfilesService.getDeveloperProfileById(developerProfileId);

  return (
    <CvContainer
      defaultCvInfo={background}
      hasProfileAccess={hasProfileAccess}
    />
  );
}
