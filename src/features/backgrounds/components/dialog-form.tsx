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

type Props = { background: BackgroundSelect };
export function DialogForm({ background }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil type="submit" size={16} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you´re done.
          </DialogDescription>
        </DialogHeader>
        <form action={updateBackgroundAction}>
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
              placeholder={background.name}
              className="col-span-3"
            />

            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              placeholder={background.title}
              name="title"
              id="title"
              className="col-span-3"
            />
            <Label htmlFor="bio" className="text-right">
              Headline
            </Label>
            <Input
              placeholder={background.bio}
              name="bio"
              id="bio"
              className="col-span-3"
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
      </DialogContent>
    </Dialog>
  );
}
