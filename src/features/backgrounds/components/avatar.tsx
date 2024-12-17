import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Props = {
  url: string;
  size?: "sm";
};

export function BackgroundAvatar({ url, size }: Props) {
  return (
    <Avatar className={size ? "w-14 h-auto" : ""}>
      <AvatarImage src={url}/>
    </Avatar>
  );
}
