/** @format */

"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Auth.Context";
import { adminLogout } from "@/services/admin";

export default function AdminLogoutButton() {
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
    <button
      onClick={handleLogout}
      className="hover:text-red-400 transition font-medium">
      Logout
    </button>
  );
}
