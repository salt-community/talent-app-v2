import { Avatar, AvatarImage } from "@/components/";

type Props = {
  url: string;
  size?: "sm" | "lg";
};

const DEFAULT_AVATAR = "/avatar.png";
export function BackgroundAvatar({ url, size }: Props) {
  const width = size === "sm" ? "w-12" : size === "lg" ? "w-52" : "";

  return (
    <Avatar className={size ? `${width} h-auto` : ""}>
      <AvatarImage src={url || DEFAULT_AVATAR} />
    </Avatar>
  );
}
