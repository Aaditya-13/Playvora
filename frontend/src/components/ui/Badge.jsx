import { cn } from "../../utils/cn";

export default function Badge({
  children,
  className,
}) {
  return (
    <span
      className={cn(
        "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700",
        className
      )}
    >
      {children}
    </span>
  );
}