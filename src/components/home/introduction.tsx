/** @format */

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const cards = [
  {
    title: "무조건 받아야 하는 셀퍼럴",
    description: "셀퍼럴로 수수료 부담없이 거래",
    image: "/images/in1.jpg",
  },
  {
    title: "이 달의 파워 거래소",
    description: "강력한 이벤트, 최고의 셀퍼럴 요율",
    image: "/images/int2.jpg",
  },
  {
    title: "사람은 믿지 마세요!",
    description: "수익이 보이는 인디케이터 제공",
    image: "/images/int3.jpg",
  },
  {
    title: "대  피  소",
    description: "쉽게, 재밌게, 유익하게 대여업체 바로 알기",
    image: "/images/int4.jpg",
  },
];

export default function Intro() {
  const [index, setIndex] = useState(0);
  const textRef = useRef(null);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setTextVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (textRef.current) observer.observe(textRef.current);
    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full pt-20 px-4 sm:px-6 md:px-8 pb-16 bg-white flex flex-col items-center">
      {/* 💡 Headline Section */}
      <div
        ref={textRef}
        className={`max-w-4xl w-full text-center mb-12 transition-all duration-700 ease-out ${
          textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
        {/* <p className="text-[#157CFF] text-xl  font-bold tracking-wide uppercase mb-2"> */}
        <p className="text-xl sm:text-3xl font-extrabold text-[#157CFF] mb-2 mt-10">
          셀퍼럴 = 매일 쌓이는 혜택
        </p>
        {/* <h1 className="text-1xl sm:text-2xl md:text-5xl font-extrabold text-[#4d4e59] leading-tight transition-all duration-1000 ease-out transform "> */}
        <h1 className="whitespace-nowrap text-2xl sm:text-5xl md:text-5xl font-extrabold text-[#4d4e59] leading-tight transition-all duration-1000 ease-out transform">
          <span className="block sm:inline">
            당신의 거래를 성공으로 이끄는
          </span>{" "}
          <span className="block sm:inline">
            필수 아이템들
          </span>
        </h1>
        {/* <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">
          가장 많은 투자자들이 선택한 셀퍼럴 거래소.{" "}
          <br className="hidden sm:inline" />
          검증된 플랫폼으로 거래 수수료를 되돌려받으세요.
        </p> */}
      </div>

      {/* 🎞️ Responsive Carousel */}
      <div className="relative w-full max-w-6xl aspect-[16/9] sm:aspect-[5/2] md:aspect-[3/1] rounded-3xl overflow-hidden shadow-xl">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}>
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover w-full h-full"
              priority
            />
            {/* ✅ 부드러운 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

            {/* ✅ 텍스트 */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white z-20">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-2 drop-shadow-md">
                {card.title}
              </h2>
              <p className="text-[15px] sm:text-2xl md:text-3xl text-gray-200 drop-shadow-sm font-extrabold">
                {card.description}
              </p>
            </div>
          </div>
        ))}
        <button
          onClick={() =>
            setIndex((prev) => (prev - 1 + cards.length) % cards.length)
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={() => setIndex((prev) => (prev + 1) % cards.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* ✅ 페이지네이션 */}
        <div className="absolute bottom-4 right-4 text-sm text-gray-100 bg-black/40 px-3 py-1 rounded-full z-30">
          {index + 1} / {cards.length}
        </div>
      </div>
    </section>
  );
}
