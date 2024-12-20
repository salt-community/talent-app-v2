"use client";
import { updateBackgroundAction } from "../actions";
import { Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { useActionState } from "react";
import { EducationSelect, LanguageSelect, SkillSelect } from "../db";

type Props = {
  background: Background;
  allSkills: SkillSelect[];
  allLanguages: LanguageSelect[];
  allEducations: EducationSelect[];
};

export function DialogForm({
  background,
  allSkills,
  allLanguages,
  allEducations,
}: Props) {
  const [message, formAction, isPending] = useActionState(
    updateBackgroundAction,
    null,
  );

  if (message) {
    console.error(message);
  }

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
          <form action={formAction} className="p-2">
            <div className="space-y-2 py-4">
              <input
                type="text"
                name={"id"}
                defaultValue={background.id}
                hidden
              />
              <input
                type="text"
                name={"devId"}
                defaultValue={background.devId}
                hidden
              />
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                name="name"
                id="name"
                required
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
               <Label htmlFor="github" className="text-right">
                Github
              </Label>
              <Input
                defaultValue={
                  background.links.find((e) => e.name === "Github")?.url
                }
                placeholder="Github..."
                name="github"
                id="github"
                className="col-span-3"
              />
              <Label htmlFor="github" className="text-right">
                CV link
              </Label>
              <Input
                defaultValue={
                  background.links.find((e) => e.name === "Resume")?.url
                }
                placeholder="CV..."
                name="cv"
                id="cv"
                className="col-span-3"
              />
            </div>

            <DialogFooter className="w-full flex items-start border-gray-800">
              <div className="flex-grow" />
              <Button className="w-full" type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
              <div className="flex-grow" />
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
