"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormItem,
  Input,
  Label,
  ScrollArea,
} from "@/components";
import { Loader2, Pencil } from "lucide-react";
import { BackgroundAvatar } from "../backgrounds/avatar";
import { useActionState, useEffect, useState } from "react";
import { updateCvHeaderAction } from "../../actions";

type Props = {
  name: string;
  bio: string;
  avatarUrl: string;
  id: string;
  identityId: string;
};

export function EditCvHeader({ name, bio, avatarUrl, id, identityId}: Props) {

 const [state, formAction, isPending] = useActionState(
     updateCvHeaderAction,
     undefined
   );
  const [avatar, setAvatar] = useState(avatarUrl);
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
            <DialogTitle>Edit CV header</DialogTitle>
            <DialogDescription>
              Make changes to your CV header here. Click save when you´re done.
            </DialogDescription>
          </DialogHeader>
          <form action={formAction} className="px-4">
            <div className="space-y-2">
              <input
                type="text"
                name={"id"}
                defaultValue={id}
                hidden
              />
              <input
                type="text"
                name={"identityId"}
                defaultValue={identityId}
                hidden
              />
              <FormItem>
                <Label htmlFor="avatarUrl">Profile picture</Label>
                <div className="flex items-center gap-2">
                  <BackgroundAvatar url={avatar} />
                  <Input
                    name="avatarUrl"
                    id="avatarUrl"
                    placeholder="Profile picture url..."
                    defaultValue={
                      (state?.update.avatar as string) || avatar
                    }
                    errorMessage={state?.errorMessages?.avatarError}
                    onChange={(e) => setAvatar(e.target.value)}
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
                      : (state?.update.name as string) || name
                  }
                  errorMessage={state?.errorMessages?.nameError}
                  placeholder="Fullname..."
                  className="col-span-3"
                />
              </FormItem>
              <FormItem>
                <Label htmlFor="bio" className="text-right">
                  Introduction
                </Label>
                <Input
                  defaultValue={bio}
                  placeholder="Introduction..."
                  name="bio"
                  id="bio"
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
