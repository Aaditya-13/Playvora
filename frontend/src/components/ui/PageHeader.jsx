import { cn } from "../../utils/cn";

export default function PageHeader({
  title,
  subtitle,
  className,
}) {
  return (
    <header className={cn("mb-6", className)}>
      <h1 className="text-2xl font-bold text-zinc-900">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-1 text-sm text-zinc-600">
          {subtitle}
        </p>
      )}
    </header>
  );
}