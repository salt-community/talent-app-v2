import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  url: string;
  size?: "sm";
};

const DEFAULT_AVATAR = "/avatar.png";
export function BackgroundAvatar({ url, size }: Props) {
  return (
    <Avatar className={size ? "w-12 h-auto" : ""}>
      <AvatarImage src={url === "" ? DEFAULT_AVATAR : url}/>
      <AvatarFallback className="text-xs">Wrong URL</AvatarFallback>
    </Avatar>
  );
}
