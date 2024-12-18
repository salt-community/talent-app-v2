import { Avatar } from "@radix-ui/react-avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import Image from "next/image";
import { Background } from "@/features/backgrounds/types";
import { projectService } from "@/features/projects/instance";
import { BackgroundAvatar } from "@/features/backgrounds/components/avatar";

type Props = { background: Background };

export async function ProjectHighlight( { background } : Props) {
  const project = (await projectService.getAll(background.devId))[0];
  const repository = project.repository.split("/")[4];

  return (
    <Card className="m-2 max-w-sm">
      <CardHeader className="px-2 py-6">
        <div className="flex items-center gap-6">
          <Avatar>
          <BackgroundAvatar size="sm" url={background.avatarUrl} />
          </Avatar>
          <div>
            <CardTitle className="text-xl">{background?.name}</CardTitle>
            <CardDescription>{background?.bio}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className=" font-semibold text-lg">{project.title}</p>
        <Image
          src={
            project.imageUrl
              ? `https://raw.githubusercontent.com/${project.username}/${repository}/main/public/${project.imageUrl}`
              : "/placholder-img.png"
          }
          width={250}
          height={240}
          alt=""
          unoptimized
          className="m-2 object-fill h-60 rounded-lg "
        />
        <p className="text-justify">
          {project.description}
        </p>
      </CardContent>
    </Card>
  );
}
