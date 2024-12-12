import { updateBackgroundAction } from "../actions";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {} from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BackgroundSelect } from "../schema";
import { TagsInput } from "./tags-input";
import { Input, Label } from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = { background: BackgroundSelect };
export function DialogForm({ background }: Props) { 
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil type="submit" size={16} />
      </DialogTrigger>
      <DialogContent className="w-screen">
        <ScrollArea className="h-[600px] ">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you´re done.
            </DialogDescription>
          </DialogHeader>
          <form action={updateBackgroundAction} className="p-2">
            <div className="space-y-2 py-4">
              <input
                type="text"
                name={"userId"}
                defaultValue={background.id}
                hidden
              />
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                name="name"
                id="name"
                defaultValue={background.name}
                placeholder="Fullname..."
                className="col-span-3"
              />

              <Label htmlFor="title" className="text-right">
                Role
              </Label>
              <Input
                placeholder="Role..." 
                name="title"
                id="title"
                defaultValue={background.title}
                className="col-span-3"
              />
              <Label htmlFor="bio" className="text-right">
                Headline
              </Label>
              <Input
                defaultValue={background.bio}
                placeholder="Headline..."
                name="bio"
                id="bio"
                className="col-span-3"
              />

              <TagsInput
                tags={background.languages}
                inputName={"languages"}
                inputPlaceholder={"Add a language"}
              />

              <TagsInput
                tags={background.educations}
                inputName={"educations"}
                inputPlaceholder={"Add an education"}
              />

              <TagsInput
                tags={background.skills}
                inputName={"skills"}
                inputPlaceholder={"Add a skill"}
              />
            </div>

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
