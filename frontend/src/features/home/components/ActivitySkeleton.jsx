export default function ActivitySkeleton() {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="w-20 h-6 bg-zinc-200 rounded-full"></div>
        <div className="w-16 h-4 bg-zinc-100 rounded-md mt-1"></div>
      </div>

      <div className="w-3/4 h-6 bg-zinc-200 rounded-md mb-2"></div>
      <div className="w-1/2 h-4 bg-zinc-100 rounded-md mb-4"></div>

      <div className="flex items-center gap-6 pt-3 border-t border-zinc-100">
        <div className="w-16 h-4 bg-zinc-200 rounded-md"></div>
        <div className="w-16 h-4 bg-zinc-200 rounded-md"></div>
        <div className="w-12 h-4 bg-zinc-200 rounded-md"></div>
      </div>
    </div>
  );
}