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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-screen-sm items-center justify-around lg:max-w-5xl">
        {navigationItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-xs transition-colors ${
                isActive
                  ? "text-green-600"
                  : "text-zinc-500 hover:text-zinc-900"
              }`
            }
          >
            <Icon size={22} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}