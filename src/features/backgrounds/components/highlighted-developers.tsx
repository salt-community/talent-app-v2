import { Card, CardContent } from "@/components";
import { Background } from "./background";


type Props = {
 developerProfileIds: string[]
}

export async function HighlightedDevelopers({developerProfileIds}: Props) {

  return (
    <>
      <ul className="px-4 pt-10 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {developerProfileIds.map((developerProfileId, index) => (
          <li key={index} className="">
            <Card className="p-2 h-full flex justify-center min-w-[20rem]">
              <CardContent>
                <Background developerProfileId={developerProfileId} page="highlight" />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
