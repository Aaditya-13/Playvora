import {
  Home,
  Search,
  PlusSquare,
  LayoutDashboard,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import ROUTES from "../../constants/routes";

const navigationItems = [
  {
    label: "Home",
    icon: Home,
    to: ROUTES.HOME,
  },
  {
    label: "Search",
    icon: Search,
    to: ROUTES.SEARCH,
  },
  {
    label: "Create",
    icon: PlusSquare,
    to: ROUTES.CREATE,
  },
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: ROUTES.DASHBOARD,
  },
  {
    label: "Profile",
    icon: User,
    to: ROUTES.PROFILE,
  },
];

export default function BottomNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white md:hidden">
      <div className="mx-auto flex h-16 max-w-screen-sm items-center justify-around px-2">
        {navigationItems.map(({ label, icon: Icon, to }) => (
          <NavLink key={label} to={to}>
            {({ isActive }) => (
              <div className="flex min-w-16 flex-col items-center justify-center gap-1">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-150 ${
                    isActive
                      ? "bg-green-100 text-green-600"
                      : "text-zinc-500"
                  }`}
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.4 : 2}
                  />
                </div>

                <span
                  className={`text-[11px] font-medium transition-colors duration-150 ${
                    isActive
                      ? "text-green-600"
                      : "text-zinc-500"
                  }`}
                >
                  {label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}