import { Avatar, AvatarImage } from "@/components/ui/avatar"; 

type Props = {
  url: string;
};

export function BackgroundAvatar({ url }: Props) {
  return (
    <Avatar>
      <AvatarImage src={url} />
    </Avatar>
  );
}
