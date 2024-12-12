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
import { SkillsInput } from "./skills-input";

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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <input
                type="text"
                name={"userId"}
                defaultValue={background.id}
                hidden
              />
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <input
                name="name"
                placeholder={background.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="username" className="text-right">
                Title
              </label>
              <input
                placeholder={background.title}
                name="title"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bio" className="text-right">
                Bio
              </label>
              <input
                placeholder={background.bio}
                name="bio"
                className="col-span-3"
              />
            </div>

            <SkillsInput tags={background.skills} />
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
