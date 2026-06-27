import { Outlet } from "react-router-dom";

import BottomNavigation from "../components/shared/BottomNavigation";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-screen-sm flex-col bg-white shadow-sm lg:max-w-5xl">
        <main className="flex-1 pb-20">
          <Outlet />
        </main>

        <BottomNavigation />
      </div>
    </div>
  );
}