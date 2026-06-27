import { cn } from "../../utils/cn";

export default function Input({
  label,
  error,
  className,
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}

      <input
        className={cn(
          "h-12 w-full rounded-xl border border-zinc-300 px-4 outline-none transition focus:border-green-600",
          className
        )}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}