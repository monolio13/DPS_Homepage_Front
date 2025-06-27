/** @format */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { userLogin } from "@/services/users";
import Image from "next/image";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useUser } from "@/context/User.Context";
import axios from "axios";

export default function UserLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userLogin(form.email, form.password);

      // ✅ Fetch and update context manually
      const res = await axios.get("https://api.metaselferral.com/api/user/me", {
        withCredentials: true,
      });
      setUser(res.data); // ✅ update context immediately

      router.push("/");
    } catch (err) {
      alert("로그인에 실패했습니다.");
      console.error(err);
    }
  };

  const handleNaverLogin = () => {
    window.location.href = "https://api.metaselferral.com/api/user/naver";
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://api.metaselferral.com/api/user/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-100 to-gray-200 px-4 py-10">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-xl text-gray-800 transition-all duration-500">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8">
          로그인
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-600 font-medium mb-1 block">
              이메일
            </label>
            <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-400 transition">
              <EnvelopeIcon className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="이메일 입력"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent outline-none border-none text-gray-800 placeholder-gray-400 ml-3 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium mb-1 block">
              비밀번호
            </label>
            <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-400 transition">
              <LockClosedIcon className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="비밀번호 입력"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-transparent outline-none border-none text-gray-800 placeholder-gray-400 ml-3 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow-sm transition-all duration-300">
            로그인
          </button>

          <div className="flex items-center justify-center my-4">
            <div className="w-full border-t border-gray-200" />
            <span className="px-3 text-sm text-gray-400">또는</span>
            <div className="w-full border-t border-gray-200" />
          </div>

          <button
            onClick={handleNaverLogin}
            type="button"
            className="w-full flex items-center justify-center bg-[#03C75A] hover:bg-[#02b552] text-white font-medium py-3 rounded-xl gap-3 transition cursor-pointer shadow-sm">
            <Image src="/naverorg.png" alt="Naver" width={46} height={36} />
            네이버로 계속하기
          </button>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 rounded-xl gap-3 transition cursor-pointer shadow-sm">
            <Image src="/googleicon.webp" alt="Google" width={24} height={24} />
            Google로 계속하기
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-500">
          아직 계정이 없으신가요?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-semibold hover:underline">
            회원가입하기
          </Link>
        </p>
      </div>
    </div>
  );
}
