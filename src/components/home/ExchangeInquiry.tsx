/** @format */

import { useState } from "react";
import axios from "axios";
const baseURL = "http://localhost:4000/api/user";
const ExchangeInquiryForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    age: "",
    exchange: "",
    experience: "",
    callTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      setMessage(res.data.message);
      setForm({
        name: "",
        phone: "",
        age: "",
        exchange: "",
        experience: "",
        callTime: "",
      });
    } catch (err: any) {
      setMessage(err.response?.data?.message || "제출에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#101014] text-white py-16 px-4">
      <div className="max-w-xl mx-auto bg-[#1a1b1f] p-8 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-amber-400">
          거래소 문의 등록
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="이름"
            required
            className="w-full bg-gray-800 p-3 rounded-md border border-gray-600 text-white"
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="전화번호"
            required
            className="w-full bg-gray-800 p-3 rounded-md border border-gray-600 text-white"
          />

          <select
            name="age"
            value={form.age}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 p-3 rounded-md border border-gray-600 text-white">
            <option value="">나이 선택</option>
            {Array.from({ length: 83 }, (_, i) => 18 + i).map((age) => (
              <option key={age} value={age}>
                {age}세
              </option>
            ))}
          </select>

          <select
            name="exchange"
            value={form.exchange}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 p-3 rounded-md border border-gray-600 text-white">
            <option value="">거래소 선택</option>
            <option value="HEDGEHOOD">HEDGEHOOD</option>
            <option value="Vantage">Vantage</option>
            <option value="XM">XM</option>
            <option value="fpmarkets">FPMarkets</option>
          </select>

          <select
            name="experience"
            value={form.experience}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 p-3 rounded-md border border-gray-600 text-white">
            <option value="">경험 선택</option>
            <option value="초보">초보</option>
            <option value="중급">중급</option>
            <option value="고급">고급</option>
          </select>

          <select
            name="callTime"
            value={form.callTime}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 p-3 rounded-md border border-gray-600 text-white">
            <option value="">연락 가능 시간</option>
            <option value="오전 9시 ~ 12시">오전 9시 ~ 12시</option>
            <option value="오후 12시 ~ 6시">오후 12시 ~ 6시</option>
            <option value="저녁 6시 이후">저녁 6시 이후</option>
          </select>
          <input
            type="text"
            // name="name"
            // value={form.name}
            // onChange={handleChange}
            placeholder="문의 사항"
            required
            className="w-full bg-gray-800 p-3 rounded-md border border-gray-600 text-white"
          />

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-md transition"
            disabled={loading}>
            {loading ? "제출 중..." : "문의 제출하기"}
          </button>
          {message && (
            <p className="text-center mt-4 text-sm text-amber-400">{message}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ExchangeInquiryForm;
