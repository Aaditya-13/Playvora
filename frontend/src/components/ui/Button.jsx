import { LoaderCircle } from "lucide-react";
import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-green-600 text-white hover:bg-green-700",

  secondary:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",

  outline:
    "border border-zinc-300 bg-white hover:bg-zinc-50",

  danger:
    "bg-red-600 text-white hover:bg-red-700",
};

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className,
  ...props
}) {
  return (
    <button
      className={cn(
        "flex h-12 w-full items-center justify-center rounded-xl text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <LoaderCircle className="h-5 w-5 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}