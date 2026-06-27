import { cn } from "../../utils/cn";

export default function AuthContainer({
  children,
  className,
}) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}