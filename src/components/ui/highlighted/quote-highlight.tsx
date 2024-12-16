import Image from "next/image";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";

export function QuoteHighlight() {
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
        <blockquote className="py-6 pr-2 italic text-2xl text-justify leading-9">
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, ea? Obcaecati perferendis voluptatum facilis, at quos animi, voluptates!"
        </blockquote>
      </CardContent>
    </Card>
  );
}
