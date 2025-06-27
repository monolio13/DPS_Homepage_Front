/** @format */
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserGroupIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: HomeIcon,
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: UserGroupIcon,
    },
    {
      label: "Exchange Users",
      href: "/admin/exchangeUsers",
      icon: ChartBarIcon,
    },
    {
      label: "Q&A",
      href: "/admin/qa",
      icon: ChartBarIcon, // You can use a better icon (e.g. QuestionMarkCircleIcon)
    },
  ];

  return (
    <aside className="h-full w-full flex flex-col bg-white border-r border-gray-200 py-6 px-4 shadow-md">
      <div className="text-2xl font-extrabold text-blue-600 mb-8 tracking-wide">
        ⚙️ Admin Panel
      </div>
      <nav className="flex flex-col space-y-2">
        {links.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium ${
                isActive
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-700"
              }`}>
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
