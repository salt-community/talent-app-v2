import Image from "next/image";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";

export function VideoHighlight() {
  return (
    <Card className="m-2 max-w-sm">
      <CardHeader className="px-2 py-6">
        <div className="flex items-center gap-6">
          <Avatar>
            <AvatarImage className="w-10" src={"./avatar.png"} />
          </Avatar>
          <div>
            <CardTitle className="text-xl">Developer Name</CardTitle>
            <CardDescription>Full-stack JavaScript Developer</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
       <div className="border-2 p-2 flex justify-center items-center h-56">Placeholder for video</div>
      </CardContent>
    </Card>
  );
}
