import { SearchX } from "lucide-react";

export default function SearchEmpty() {
  return (
    <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
        <SearchX size={28} />
      </div>

      <h2 className="mt-5 text-lg font-bold">
        No activities found
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        Try searching with another keyword.
      </p>

    </div>
  );
}