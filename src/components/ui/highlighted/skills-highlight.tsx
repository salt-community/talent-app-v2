import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { Badge } from "@/components/ui/badge";

export function SkillsHighlight() {
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
      <CardContent className="pt-0 leading-8">
        <p className="font-bold ml-1">Skills</p>
        <div className="space-x-1">
          <Badge className="cursor-default">Next.js</Badge>
          <Badge className="cursor-default">TypeScript</Badge>
          <Badge className="cursor-default">Node.js</Badge>
          <Badge className="cursor-default">Figma</Badge>
        </div>
        <p className="font-bold ml-1 mt-2">Education</p>
        <p className="pl-1 text-sm">Diploma in Architecture</p>
        <p className="pl-1 text-sm pb-2">Certificate in Front-End Development</p>
      </CardContent>
    </Card>
  );
}
