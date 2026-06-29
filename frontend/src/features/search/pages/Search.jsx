import { useState } from "react";

import BottomNavigation from "../../../components/shared/BottomNavigation";
import Input from "../../../components/ui/Input";

import SearchHeader from "../components/SearchHeader";
import SearchResults from "../components/SearchResults";
import SearchEmpty from "../components/SearchEmpty";

import ActivitySkeleton from "../../home/components/ActivitySkeleton";

import useSearchActivities from "../hooks/useSearchActivities";
import useDebounce from "../../../hooks/useDebounce";

export default function Search() {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query);

  const {
    data,
    isLoading,
  } = useSearchActivities(debouncedQuery);

  const activities = data?.data ?? [];

  return (
    <main className="min-h-screen bg-zinc-50 pb-24">
      <section className="mx-auto max-w-5xl px-4 py-6">

        <SearchHeader />

        <Input
          placeholder="Search title, sport or ground..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="mt-6">
          {!debouncedQuery.trim() ? (
            <SearchEmpty />
          ) : isLoading ? (
            <ActivitySkeleton />
          ) : activities.length === 0 ? (
            <SearchEmpty />
          ) : (
            <SearchResults
              activities={activities}
            />
          )}
        </div>

      </section>

      <BottomNavigation />
    </main>
  );
}