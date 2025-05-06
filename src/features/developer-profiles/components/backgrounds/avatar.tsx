import { Avatar, AvatarFallback, AvatarImage } from "@/components/";
import Image from "next/image";

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
      <AvatarFallback asChild>
        <Image src="/avatar.png" width={250} height={250} alt="Avatar"></Image>
      </AvatarFallback>
    </Avatar>
  );
}
