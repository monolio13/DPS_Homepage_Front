/** @format */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/services/admin";
import { useAuth } from "@/context/Auth.Context";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const { fetchMe } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminLogin(form.email, form.password);
      // Wait a little for cookie to be attached before fetchMe
      await fetchMe();
      router.push("/admin");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-black flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10 w-full max-w-md text-white">
        <h1 className="text-3xl font-extrabold text-center mb-6">
          🔐 Admin Login
        </h1>
        <p className="text-sm text-gray-300 text-center mb-8">
          Enter your admin credentials to access the dashboard
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-semibold py-2 rounded-lg shadow-md">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
