import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function DashboardAvatar() {
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage src={"./avatar.png"} />
    </Avatar>
  );
}
