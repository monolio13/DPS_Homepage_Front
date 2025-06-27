/** @format */

"use client";

import { useEffect, useState } from "react";

export default function RefundCalculatorPhone() {
  const [contracts, setContracts] = useState("");
  const parsed = parseInt(contracts, 10);
  const refund = isNaN(parsed) ? 0 : parsed * 78000;

  const currentMonth = new Date().getMonth() + 1; // 1-based month
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;

  const rotateMonth = (month: number) => ((month - 1 + 12) % 12) + 1;

  const visibleMonths = [
    currentMonth,
    lastMonth,
    4,
    rotateMonth(currentMonth - 3),
    rotateMonth(currentMonth - 4),
  ];

  const fixedRefunds = [
    "617,119원",
    "364,594원",
    "499,476원",
    "562,442원",
    "427,917원",
  ];

  return (
    <div
      className="relative w-full max-w-[460px] mx-auto aspect-[460/740] bg-no-repeat bg-center bg-contain"
      style={{ backgroundImage: "url('/images/iphone.png')" }}>
      <img
        src="/images/logohome.png"
        alt=""
        className="absolute w-[39%] top-[11%] left-1/2 transform -translate-x-1/2"
      />

      <div className="absolute left-[10%] top-[27%] w-[77%] h-[70%] rounded-[30px] overflow-hidden px-4 py-6  text-xs sm:text-sm">
        <h2 className="text-center text-[15px] font-semibold text-gray-900 mb-4">
          환급 받으실 수 있는 금액은
        </h2>

        {/* Calculator */}
        <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm mb-4">
          <div className="flex justify-between items-center mb-3">
            <label
              htmlFor="contracts"
              className="text-[14px] text-gray-700 font-medium">
              계약수 (랏)
            </label>
            <input
              type="number"
              id="contracts"
              min={0}
              value={contracts}
              onChange={(e) => setContracts(e.target.value)}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-right text-sm text-black bg-white"
              placeholder="0"
            />
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <label className="text-[15px] font-bold text-gray-900">
              환급금
            </label>
            <input
              type="text"
              readOnly
              className="w-40 text-right text-[14px] text-black bg-transparent border-none outline-none placeholder-gray-400"
              placeholder="예상 거래 계약수를 입력해주세요!"
              value={refund > 0 ? `₩ ${refund.toLocaleString()}` : ""}
            />
          </div>
        </div>

        {/* Table */}
        <div className="text-[13px] text-gray-900 mb-6">
          <div className="flex justify-between font-semibold border-b pb-1 mb-2">
            <span>월</span>
            <span>환급금액</span>
          </div>

          {visibleMonths.map((month, i) => (
            <div
              key={month}
              className="flex justify-between border-b py-[6px] transition-all duration-500">
              <span>{month}월</span>
              <span>{fixedRefunds[i]}</span>
            </div>
          ))}
        </div>

        {/* Button */}
        <button className="w-full bg-[#157CFF] hover:bg-[#106fe0] text-white font-semibold text-sm py-2.5 rounded-full">
          신청하기
        </button>
      </div>
    </div>
  );
}
