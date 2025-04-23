type Props = {
  url: string;
  size: "sm" | "md" | "lg";
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
};

const DEFAULT_AVATAR = "/avatar.png";
export function BackgroundAvatar({ url, size, imgProps }: Props) {
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-40 h-40",
  };

  const enhancedUrl =
    url && url.includes("/api/proxy-image")
      ? `${url}&width=1000&height=1000&quality=100`
      : url;

  return (
    <div
      className={`rounded-full overflow-hidden ${sizeClasses[size]} mx-auto`}
    >
      <img
        src={enhancedUrl || "/placeholder-avatar.png" || DEFAULT_AVATAR}
        alt="Avatar"
        className="w-full h-full object-cover"
        {...imgProps}
      />
    </div>
  );
}
