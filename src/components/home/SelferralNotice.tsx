/** @format */

import { useEffect, useRef, useState } from "react";

function getDailyRandom(min: number, max: number): number {
  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
  const seed = today.split("-").join(""); // 예: "20250627"
  
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    hash &= hash; // int32 유지
  }

  const normalized = Math.abs(hash % (max - min + 1)) + min;
  return normalized;
}


export function UserDayCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {

    const peoplePerDay = getDailyRandom(1, 400);

    setCount(peoplePerDay);
  }, []);

  return (
    <span className="text-lg sm:text-lg font-extrabold md:text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap">
      매일 {count.toLocaleString()}명이 셀퍼럴을 받고 있어요
    </span>
  );
}

export function UserTotalCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const baseDate = new Date("2025-06-27").getTime(); // ← 숫자로 변환
    const today = new Date().getTime(); // ← 숫자로 변환

    const msPerDay = 1000 * 60 * 60 * 24;
    const daysPassed = Math.floor((today - baseDate) / msPerDay);

    const peoplePerDay = getDailyRandom(1, 400);
    const baseCount = 230418;
    //const total = baseCount + daysPassed * peoplePerDay;
    const total = baseCount + peoplePerDay;

    setCount(total);
  }, []);

  return (
    <span className="text-lg sm:text-lg font-extrabold md:text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap">
      누적 {count.toLocaleString()}명
    </span>
  );
}

export default function SelfReferralNotice() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  //   from-[#e3f2fd] via-[#dce6ff] to-[#f0f4ff]
  return (
    <section
      ref={sectionRef}
      className={`bg-gradient-to-br  py-24 px-4 sm:px-8 overflow-hidden transition-all duration-1000 ease-out
        ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
      <div className="max-w-6xl mx-auto relative flex flex-col items-center text-center gap-16">
        {/* Top Notice */}
        <div className="flex items-center justify-center flex-nowrap text-xl sm:text-3xl md:text-4xl font-extrabold text-[#4d4e59]">
          <img
            src="/images/nice.png"
            alt="thumbs up"
            className="w-[120px] sm:w-[180px] md:w-[300px] h-auto drop-shadow-md"
          />
          <div>
            <UserDayCounter />
            {/* <span className="text-lg sm:text-lg font-extrabold md:text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap">
              매일 517명이 셀퍼럴을 받고 있어요
            </span> */}
            <UserTotalCounter />           
          </div>

          <img
            src="/images/clock.png"
            alt="alarm clock"
            className="w-[120px] sm:w-[180px] md:w-[300px] h-auto drop-shadow-md"
          />
        </div>

        {/* Speech Bubble with Serena Image on Top */}
        <div className="relative w-full max-w-[1000px]">
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl px-6 sm:px-12 py-14 text-center z-10 border border-blue-100">
            <p className="text-2sm sm:text-xl md:text-3xl font-extrabold text-purple-600 leading-snug mb-4">
              아직도 추천인에게 주시나요?
            </p>
            <p className="text-2sm sm:text-xl md:text-3xl font-extrabold text-purple-700 leading-snug mb-4">
              수수료 90% 계속 뺏기고 있어요.
            </p>
            <p className="text-2sm sm:text-xl md:text-3xl font-extrabold text-indigo-800 leading-snug">
              지금 신청하고, 거래 수수료는 직접 챙기세요!
            </p>

            {/* Serena Image Overlapping the Text Box */}
            <img
              src="/images/serena.png"
              alt="megaphone"
              className="absolute bottom-[-60px] right-[-80px] w-[230px] sm:w-[300px] md:w-[350px] z-20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
