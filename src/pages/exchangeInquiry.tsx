/** @format */

"use client";

import { useState } from "react";
import axios from "axios";
import Toast from "@/lib/SuccessToast";

const baseURL = "https://api.metaselferral.com/api/user";
// const baseURL = "http://localhost:4000/api/user";

export default function ExchangeInquiryForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    age: "",
    callTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState<null | {
    message: string;
    type: "success" | "error";
  }>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${baseURL}/exchange-inquiry`, form);
      setForm({ name: "", phone: "", age: "", callTime: "" });
      setToast({
        message: res.data?.message || "문의가 정상적으로 등록되었습니다!",
        type: "success",
      });
    } catch (err: any) {
      setToast({
        message: err.response?.data?.message || "제출에 실패했습니다.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-100 to-gray-200 px-4 py-16 relative">
      <div className="w-full max-w-2xl bg-white border border-gray-200 p-10 rounded-3xl shadow-xl text-gray-800 transition-all duration-500">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          📋 거래소 문의 신청서
        </h2>
        <p className="text-center text-gray-600 text-base mb-10">
          아래 정보를 입력하시면 상담원이 확인 후 연락드립니다.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-lg">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              이름
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="이름"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              전화번호
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="010-1234-5678"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              나이
            </label>
            <select
              name="age"
              value={form.age}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none">
              <option value="">선택해주세요</option>
              <option value="20">20대</option>
              <option value="30">30대</option>
              <option value="40">40대</option>
              <option value="50">50대</option>
              <option value="60">60대 이상</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              연락 가능 시간
            </label>
            <select
              name="callTime"
              value={form.callTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none">
              <option value="">선택해주세요</option>
              <option value="30분이내">30분이내</option>
              <option value="오전 9시 ~ 12시">오전 9시 ~ 12시</option>
              <option value="오후 12시 ~ 6시">오후 12시 ~ 6시</option>
              <option value="저녁 6시 이후">저녁 6시 이후</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg text-lg shadow-md transition">
            {loading ? "제출 중..." : "문의 제출하기"}
          </button>

          {message && (
            <p className="text-center mt-4 text-base text-green-600 font-semibold">
              {message}
            </p>
          )}
        </form>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
