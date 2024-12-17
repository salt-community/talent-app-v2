import { updateBackgroundAction } from "../actions";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TagsInput } from "./tags-input";
import { Input, Label } from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Background } from "../types";
import { backgroundsService } from "../instance";

type Props = { background: Background };
export async function DialogForm({ background }: Props) {
  const allSkills = await backgroundsService.getAllSkills();
  const allLanguages = await backgroundsService.getAllLanguages();
  const allEducations = await backgroundsService.getAllEducations();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil
          type="button"
          size={20}
          strokeWidth={2.5}
          className="cursor-pointer"
        />
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
                name={"id"}
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
                userTags={background.languages}
                inputName={"languages"}
                inputPlaceholder={"Add a language"}
                suggestedTags={allLanguages}
              />

              <TagsInput
                userTags={background.educations}
                inputName={"educations"}
                inputPlaceholder={"Add an education"}
                suggestedTags={allEducations}
              />

              <TagsInput
                userTags={background.skills}
                inputName={"skills"}
                inputPlaceholder={"Add a skill"}
                suggestedTags={allSkills}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
