/** @format */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { userRegister } from "@/services/users";
import Link from "next/link";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export default function UserRegister() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userRegister(form.email, form.password, form.name, form.phone);
      alert("회원가입이 완료되었습니다!");
      router.push("/login");
    } catch (err) {
      alert("회원가입에 실패했습니다.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-100 to-gray-200 px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-gray-200 p-8 sm:p-10 rounded-3xl shadow-xl text-gray-800 transition-all duration-500">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          회원가입
        </h2>

        <div className="space-y-5">
          {[
            {
              label: "이메일",
              key: "email",
              type: "email",
              icon: <EnvelopeIcon className="w-5 h-5 text-gray-400" />,
            },
            {
              label: "비밀번호",
              key: "password",
              type: "password",
              icon: <LockClosedIcon className="w-5 h-5 text-gray-400" />,
            },
            {
              label: "이름",
              key: "name",
              type: "text",
              icon: <UserIcon className="w-5 h-5 text-gray-400" />,
            },
            {
              label: "전화번호",
              key: "phone",
              type: "tel",
              icon: <PhoneIcon className="w-5 h-5 text-gray-400" />,
            },
          ].map(({ label, key, type, icon }) => (
            <div key={key} className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                {label}
              </label>
              <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-400 transition">
                {icon}
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  placeholder={label}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full bg-transparent outline-none border-none text-gray-800 placeholder-gray-400 ml-3 text-sm"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-md">
          회원가입하기
        </button>

        <p className="text-sm text-center mt-6 text-gray-500">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-semibold hover:underline">
            로그인하기
          </Link>
        </p>
      </form>
    </div>
  );
}
