import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SportChips from "../components/SportChips";
import BottomNavigation from "../../../components/shared/BottomNavigation";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col bg-zinc-50">
      <Header />

      <section className="px-4 py-5">
        <SearchBar />

        <SportChips />

        <div className="mt-6">
          Activities will appear here...
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}