import {
  ChevronRight,
  LogOut,
  Pencil,
  Settings,
  MapPinned
} from "lucide-react";
import { useNavigate } from "react-router";
import ROUTES from "../../../constants/routes";

export default function QuickActionsCard({
  onLogout,
  isLoggingOut,
}) {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Edit Profile",
      icon: Pencil,
      onClick: () => navigate("/profile/edit"),
    },
    {
      title: "Settings",
      icon: Settings,
      onClick: () => navigate("/profile/settings"),
    },
    {
    title: "Saved Location",
    icon: MapPinned,
    onClick: () =>
      navigate(ROUTES.PROFILE_SAVED_LOCATION),
    },
    {
      title: isLoggingOut
        ? "Logging out..."
        : "Logout",
      icon: LogOut,
      danger: true,
      disabled: isLoggingOut,
      onClick: onLogout,
    },
  ];

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-lg font-bold">
        Quick Actions
      </h2>

      <div className="space-y-3">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={action.onClick}
              disabled={action.disabled}
              className="group flex h-16 w-full items-center justify-between rounded-2xl border border-zinc-200 px-5 transition-all hover:border-green-200 hover:bg-green-50/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <div className="flex items-center gap-4">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    action.danger
                      ? "bg-red-50 text-red-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  <Icon size={20} />
                </div>

                <span
                  className={`text-sm font-semibold ${
                    action.danger
                      ? "text-red-600"
                      : "text-zinc-900"
                  }`}
                >
                  {action.title}
                </span>

              </div>

              <ChevronRight
                size={18}
                className="text-zinc-400 transition-transform group-hover:translate-x-1"
              />

            </button>
          );
        })}

      </div>

    </section>
  );
}