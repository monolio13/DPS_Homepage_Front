/** @format */

import { Bars3Icon } from "@heroicons/react/24/outline";
import { adminLogout } from "@/services/admin";
import { useAuth } from "@/context/Auth.Context";
import { useRouter } from "next/navigation";

export default function AdminHeader({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  const { setUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await adminLogout();
      setUser(null); // Clear user from context
      router.push("/admin/login"); // Redirect to admin login
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed. Please try again.");
    }
  };
  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm">
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle (mobile only) */}
        <button className="md:hidden" onClick={onToggleSidebar}>
          <Bars3Icon className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">Admin Dashboard</h1>
      </div>

      {/* Logout button (visible on all screen sizes now) */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md font-semibold shadow-sm transition duration-200">
        로그아웃
      </button>
    </header>
  );
}
