"use client";
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
import { FormItem, Input, Label } from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BackgroundInfo,
  EducationSelect,
  LanguageSelect,
  SkillSelect,
} from "../../types";
import { useActionState, useState, useEffect } from "react";
import { BackgroundAvatar } from "./avatar";
import { updateBackgroundAction } from "../../actions";

type Props = {
  background: BackgroundInfo;
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
  const [state, formAction, isPending] = useActionState(
    updateBackgroundAction,
    undefined
  );

  const [avatarUrl, setAvatarUrl] = useState(background.avatarUrl);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isPending && state?.errorMessages === undefined) {
      setIsOpen(false);
    }
  }, [isPending, state]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Pencil
          type="button"
          size={20}
          strokeWidth={2.5}
          className="cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className="w-screen pt-9">
        <ScrollArea className="h-[600px]">
          <DialogHeader className="px-4">
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you´re done.
            </DialogDescription>
          </DialogHeader>
          <form action={formAction} className="px-4">
            <div className="space-y-2">
              <input
                type="text"
                name={"id"}
                defaultValue={background.id}
                hidden
              />
              <input
                type="text"
                name={"identityId"}
                defaultValue={background.identityId}
                hidden
              />
              <FormItem>
                <Label htmlFor="avatarUrl">Profile picture</Label>
                <div className="flex items-center gap-2">
                  <BackgroundAvatar url={avatarUrl} />
                  <Input
                    name="avatarUrl"
                    id="avatarUrl"
                    placeholder="Profile picture url..."
                    defaultValue={
                      (state?.update.avatarUrl as string) || avatarUrl
                    }
                    errorMessage={state?.errorMessages?.avatarUrlError}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                  />
                </div>
              </FormItem>
              <FormItem>
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  name="name"
                  id="name"
                  required
                  defaultValue={
                    (state?.update.name as string) === ""
                      ? ""
                      : (state?.update.name as string) || background.name
                  }
                  errorMessage={state?.errorMessages?.nameError}
                  placeholder="Fullname..."
                  className="col-span-3"
                />
              </FormItem>
              <FormItem>
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  placeholder="Title"
                  name="title"
                  id="title"
                  required
                  defaultValue={
                    (state?.update.title as string) === ""
                      ? ""
                      : (state?.update.title as string) || background.title
                  }
                  errorMessage={state?.errorMessages?.titleError}
                  className="col-span-3"
                />
              </FormItem>
              <FormItem>
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
              </FormItem>
              <FormItem>
                <TagsInput
                  userTags={background.languages}
                  inputName={"languages"}
                  inputPlaceholder={"Add a language"}
                  suggestedTags={allLanguages}
                />
              </FormItem>
              <FormItem>
                <TagsInput
                  userTags={background.educations}
                  inputName={"educations"}
                  inputPlaceholder={"Add an education"}
                  suggestedTags={allEducations}
                />
              </FormItem>
              <FormItem>
                <TagsInput
                  userTags={background.skills}
                  inputName={"skills"}
                  inputPlaceholder={"Add a skill"}
                  suggestedTags={allSkills}
                />
              </FormItem>
              <FormItem>
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
              </FormItem>
              <FormItem>
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
              </FormItem>
            </div>

            <DialogFooter className="w-full flex items-start border-gray-800">
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
            </DialogFooter>
            {state?.errorMessages ? (
              <p className="text-red-600 font-bold h-6">
                Form error. Please make the necessary changes.
              </p>
            ) : (
              <p className="h-6"></p>
            )}
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
