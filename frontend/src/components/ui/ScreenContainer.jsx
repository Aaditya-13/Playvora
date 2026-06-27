import { cn } from "../../utils/cn";

export default function ScreenContainer({
  children,
  className,
}) {
  return (
    <section
      className={cn(
        "mx-auto flex min-h-full w-full max-w-screen-sm flex-col px-4 py-6",
        className
      )}
    >
      {children}
    </section>
  );
}