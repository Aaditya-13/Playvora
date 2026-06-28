import BottomNavigation from "../../../components/shared/BottomNavigation";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SportChip from "../components/SportChip";
import ActivityList from "../components/ActivityList";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 pb-20">
      <Header />

      <section className="mx-auto w-full max-w-5xl px-4 py-5">
        <SearchBar />

        <div className="mt-5">
          <SportChip />
        </div>

        <div className="mt-6">
          <ActivityList />
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}