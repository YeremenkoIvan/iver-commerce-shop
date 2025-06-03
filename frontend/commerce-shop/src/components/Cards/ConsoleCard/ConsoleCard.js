import { UserTabs, AdminTabs } from "./TabsOptions";

const tabsOptions = {
  user: <UserTabs />,
  admin: <AdminTabs />,
};

export default function ConsoleCard({ profile, className }) {
  return (
    <div
      className={`max-h-[750px] bg-primary text-dark p-4 rounded border-0 shadow flex flex-col ${className}`}
    >
      <p className="text-4xl font-bold text-dark border-b border-current pb-2">
        Меню {profile?.role === "user" ? "Користувача" : "Адміна"}
      </p>

      {tabsOptions[profile?.role]}
    </div>
  );
}
