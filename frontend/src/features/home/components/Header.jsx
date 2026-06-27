import Logo from "../../../components/ui/Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />

        <button className="rounded-xl border px-4 py-2 text-sm font-medium">
          Profile
        </button>
      </div>
    </header>
  );
}