import { cn } from "../../utils/cn";

export default function PageHeader({
  title,
  subtitle,
  leftNode,
  rightNode,
  className,
}) {
  return (
    <header
      className={cn(
        "mb-6 flex items-start justify-between",
        className
      )}
    >
      <div className="flex items-start gap-3">

        {leftNode}

        <div>
          <h1 className="text-2xl font-bold text-zinc-900">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-1 text-sm text-zinc-600">
              {subtitle}
            </p>
          )}
        </div>

      </div>

      {rightNode}
    </header>
  );
}