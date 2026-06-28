import { User } from "lucide-react";
import { cn } from "../../utils/cn";

const SIZE_MAP = {
  xs: 32,
  sm: 40,
  md: 48,
  lg: 64,
  xl: 80,
};

export default function Avatar({
  src,
  alt = "Avatar",
  size = "md",
  className,
}) {
  const avatarSize =
    typeof size === "number"
      ? size
      : SIZE_MAP[size] || SIZE_MAP.md;

  return src ? (
    <img
      src={src}
      alt={alt}
      width={avatarSize}
      height={avatarSize}
      className={cn(
        "rounded-full object-cover",
        className
      )}
    />
  ) : (
    <div
      style={{
        width: avatarSize,
        height: avatarSize,
      }}
      className={cn(
        "flex items-center justify-center rounded-full bg-zinc-200",
        className
      )}
    >
      <User size={avatarSize / 2} />
    </div>
  );
}