import { User } from "lucide-react";
import { cn } from "../../utils/cn";

export default function Avatar({
  src,
  size = 48,
  className,
}) {
  return src ? (
    <img
      src={src}
      alt="Avatar"
      width={size}
      height={size}
      className={cn(
        "rounded-full object-cover",
        className
      )}
    />
  ) : (
    <div
      style={{
        width: size,
        height: size,
      }}
      className={cn(
        "flex items-center justify-center rounded-full bg-zinc-200",
        className
      )}
    >
      <User size={size / 2} />
    </div>
  );
}