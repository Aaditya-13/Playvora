import { cn } from "../../utils/cn";

export default function Card({
  children,
  className,
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}