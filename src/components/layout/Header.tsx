/** @format */

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  Bars3Icon,
  XMarkIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/User.Context";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await axios.post(
      "https://api.metaselferral.com/api/user/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full h-20 px-4 sm:px-6 lg:px-12 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md"
          : "bg-[#111827]/70 backdrop-blur-sm"
      }`}>
      {/* Logo */}
      <Link href="/" className="flex items-center">
        {scrolled ? (
          <img
            src="/images/msblack.png"
            alt="DPS Logo"
            className="h-20 object-contain"
          />
        ) : (
          <img
            src="/images/mswhiet.png"
            alt="DPS Logo"
            className="absolute h-20 object-contain"
          />
        )}
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-4">
        <Link
          href="/QApublicSection"
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
            scrolled
              ? "text-gray-800 hover:text-indigo-600"
              : "text-white hover:text-indigo-300"
          }`}>
          <QuestionMarkCircleIcon className="w-5 h-5" />
          FAQ
        </Link>

        {user ? (
          <>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                scrolled ? "text-gray-800" : "text-white"
              }`}>
              👋 {user.name}
            </div>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                scrolled
                  ? "text-gray-800 hover:text-red-500"
                  : "text-white hover:text-red-300"
              }`}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                scrolled
                  ? "text-gray-800 hover:text-indigo-600"
                  : "text-white hover:text-indigo-300"
              }`}>
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              로그인
            </Link>
            <Link
              href="/register"
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition shadow-sm ${
                scrolled
                  ? "bg-[#157CFF] text-white hover:bg-indigo-500"
                  : "bg-white text-gray-900 hover:bg-gray-200"
              }`}>
              <UserPlusIcon className="w-5 h-5" />
              회원가입
            </Link>
          </>
        )}
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`md:hidden transition ${
          scrolled ? "text-gray-800" : "text-white"
        }`}>
        {menuOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-md text-gray-900 border-t z-40 shadow-xl md:hidden animate-fade-down">
          <div className="flex flex-col items-center gap-4 py-6">
            <Link
              href="/QApublicSection"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:text-indigo-500 transition">
              <QuestionMarkCircleIcon className="w-5 h-5" />
              FAQ
            </Link>

            {user ? (
              <>
                <div className="text-sm font-medium">👋 {user.name}</div>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-500 hover:text-red-600 transition">
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:text-indigo-500 transition">
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  로그인
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold hover:text-indigo-500 transition">
                  <UserPlusIcon className="w-5 h-5" />
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
