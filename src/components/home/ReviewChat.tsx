/** @format */

import { useEffect, useRef, useState } from "react";

export default function TestimonialChat() {
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

  return (
    <section
      ref={sectionRef}
      className={`py-16 px-4 sm:px-12 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Title */}
        <div className="flex items-center gap-4">
          <h2 className="text-[30px] sm:text-[45px] font-extrabold text-[#4d4e59] tracking-tight">
            사용 후기
          </h2>
          <img
            src="/images/sis.png"
            alt="후기 아이콘"
            className="w-24 sm:w-32"
          />
        </div>

        {/* Chat Bubbles */}
        <div className="space-y-10 text-sm sm:text-base md:text-lg">
          {/* Message 1 - Left */}
          <div className="w-full max-w-4xl mx-auto flex items-end gap-4 sm:gap-6">
            <img
              src="/images/001.png"
              alt="user1"
              className="w-14 sm:w-20 md:w-24 h-auto "
            />

            <div className="relative w-full bg-gradient-to-r from-[#bde0fe] to-[#a2d2ff] backdrop-blur-lg text-gray-900 px-5 sm:px-6 py-5 sm:py-8 rounded-[26px] rounded-bl-none shadow-2xl font-medium leading-relaxed tracking-wide">
              <span className="font-extrabold text-[17px] sm:text-[35px] text-[#157CFF] block mb-3">
                "셀퍼럴 수수료를 받는 순간 감동"
              </span>
              <p className="text-[15px] sm:text-[25px] text-gray-800 font-bold">
                제 거래 수수료가 이렇게 많은줄 몰랐어요. 
                <br className="hidden sm:block" /> 받은 수수료가 출금도 되니 너무 감동이더라구요.
              </p>
              <div className="absolute bottom-1 right-5 text-xs sm:text-sm text-gray-600 font-semibold">
                이** 고객님
              </div>
            </div>
          </div>

          {/* Message 2 - Right */}
          <div className="flex items-end gap-4 sm:gap-6">
            {/* 텍스트 박스 */}
            <div className="relative self-start w-[80%] sm:w-[85%] bg-gradient-to-r from-[#57a0ff]/80 to-[#006aff]/80 backdrop-blur-md text-white px-5 sm:px-6 py-5 sm:py-8 rounded-[26px] rounded-br-none shadow-2xl font-medium leading-relaxed tracking-wide sm:ml-8">
              <span className="font-extrabold text-[17px] sm:text-[35px] block mb-2">
                "일단 한 번 신청해보세요"
              </span>
              <p className="text-[15px] sm:text-[25px] font-bold">
                처음엔 설마 하는 마음이었는데, 무료니깐 신청이나 해보자 하고
                시작했어요.
                <br className="hidden sm:block" />{" "}
                거래를 많이 하지는 않지만 거래할 때마다 쌓이는 수수료가 제법
                크더라구요.
              </p>
              <div className="absolute right-5 bottom-3 text-xs sm:text-sm text-white/80 font-semibold">
                임** 고객님
              </div>
            </div>
            {/* 이미지 */}
            <img
              src="/images/002.png"
              alt="user2"
              className="w-14 sm:w-20 md:w-24 h-auto"
            />
          </div>

          {/* Message 3 - Left */}
          <div className="w-full max-w-4xl mx-auto flex items-end gap-4 sm:gap-6">
            <img
              src="/images/003.png"
              alt="user1"
              className="w-14 sm:w-20 md:w-24 h-auto"
            />

            <div className="relative w-full bg-gradient-to-br from-white via-pink-50 to-rose-100 border border-rose-200 backdrop-blur-lg text-gray-900 px-5 sm:px-6 py-5 sm:py-8 rounded-[26px] rounded-bl-none shadow-2xl font-medium leading-relaxed tracking-wide">
              <span className="font-extrabold text-[17px] sm:text-[35px] text-[#157CFF] block mb-3">
                "공돈 생기는데 안할 이유 없죠"
              </span>
              <p className="text-[15px] sm:text-[25px] font-bold text-gray-800">
                거래소를 바꾸는게 번거롭게 느껴졌는데, 한 번 바꾸고 나면
                번거로울게 없어요. 한 번 번거로우면, 평생 꽁돈이
                생겨요.
              </p>
              <div className="absolute bottom-1 right-5 text-xs sm:text-sm text-gray-600 font-semibold">
                최** 고객님
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
