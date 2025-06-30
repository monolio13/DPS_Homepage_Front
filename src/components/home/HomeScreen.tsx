/** @format */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function HomeScreen() {
  const router = useRouter();
  const [contracts, setContracts] = useState("");
  const [pageReady, setPageReady] = useState(false);
  const parsed = parseFloat(contracts);
  const refund = isNaN(parsed)
      ? 0
      : parsed < 500
      ? parsed * 1350 * 3
      : parsed < 1500
      ? parsed * 1350 * 3.5
      : parsed < 3000
      ? parsed * 1350 * 4
      : parsed * 1350 * 4.5;

  const currentMonth = new Date().getMonth() + 1;
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const rotateMonth = (month: number) => ((month - 1 + 12) % 12) + 1;
  const visibleMonths = [
    currentMonth,
    rotateMonth(currentMonth - 1),
    rotateMonth(currentMonth - 2),
    rotateMonth(currentMonth - 3),
    /*rotateMonth(currentMonth - 3),*/
  ];
  const fixedRefunds = [
    "617,119원",
    "364,594원",
    "499,476원",
    "562,442원",
   /* "427,917원",*/
  ];

  // Scroll animation triggers
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: phoneRef, inView: phoneInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: btnRef, inView: btnInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const timer = setTimeout(() => setPageReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      style={{
        backgroundImage: "url('/images/home.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        marginTop: "-20px",
      }}
      className={`relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-5 bg-[#f4f6ff] overflow-hidden transition-opacity duration-1000 ease-in-out ${
        pageReady ? "opacity-100" : "opacity-0"
      }`}>
      <div className="relative z-10 w-full max-w-6xl text-center">
        <p className="text-xl sm:text-3xl font-extrabold text-[#157CFF] mb-4 sm:mb-6 mt-10">
          셀퍼럴 = 내가 돌려 받는 수수료
        </p>

        <p
          ref={titleRef}
          className={`text-3xl sm:text-5xl font-extrabold text-[#4d4e59] leading-tight transition-all duration-1000 ease-out transform ${
            titleInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}>
          트레이더들을 위한
        </p>

        <p
          className={`text-3xl sm:text-3xl md:text-5xl whitespace-nowrap font-extrabold mt-4 transition-all duration-1000 ease-out transform ${
            titleInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}>
          <span className="text-[#157CFF] text-4xl sm:text-6xl">
            숨은 수수료
          </span>{" "}
          <span className="text-[#4d4e59] text-3xl sm:text-5xl">
            환급 서비스
          </span>
        </p>
      <div className="flex justify-center w-full">
            <p className="text-xl sm:text-3xl text-center text-[#157CFF] mt-4 sm:mt-6 font-semibold leading-relaxed">
            <span className="inline">무료로 신청하고 </span>{" "}
            <span className="inline whitespace-nowrap">
              <span className="text-[#157CFF] font-semibold">
                숨은 수수료 돌려 받으세요
            </span>
          </span>
          {/* <p className="mt-6 text-2xl sm:text-xl md:text-2xl font-extrabold text-[#157CFF] mb-2 whitespace-nowrap">
            무료로 신청하고 숨은 수수료 돌려 받으세요
          </p> */}
        </p>
        </div>

        {/* 아이폰 프레임 */}
        <div className="relative flex justify-center items-start mt-8">
          <div
            ref={phoneRef}
            className={`transition-all duration-1000 ease-out transform ${
              phoneInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            } relative w-full max-w-xs sm:max-w-md aspect-[460/740] bg-[url('/images/phone.png')] bg-no-repeat bg-center bg-contain`}>
            <img
              src="/images/logohome.png"
              alt="로고"
              className="absolute w-[40%] top-[8%] left-1/2 transform -translate-x-1/2 drop-shadow-md"
            />

            <div className="absolute left-[11.5%] top-[27%] w-[77%] h-[70%] rounded-[30px] px-4 sm:px-5 text-xs sm:text-sm overflow-y-auto">
              <h2 className="text-center text-[15px] sm:text-[25px] font-semibold text-[#4d4e59] mb-3">
                <span className="text-[#157CFF] font-bold">예상 환급금</span>{" "}
                계산기
              </h2>

              <div className="bg-gradient-to-br from-[#e0ecff] to-[#f4f8ff] rounded-2xl border border-blue-200 mb-4 py-[6px] animate-fade-in">
                <div className="flex justify-between items-center mt-1 mb-3">
                  <label
                    // style={{
                    //   marginLeft: "20px",
                    // }}
                    htmlFor="contracts"
                    className="ml-3 sm:ml-5 text-[15px] sm:text-[20px] font-bold text-[#157CFF]">
                    계 약 수 :
                  </label>
                  <div
                    style={{
                      marginRight: "10px",
                    }}
                    className="relative w-32 sm:w-45">
                    {contracts === "" && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }} // opacity를 반복적으로 변경
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 z-10 flex items-center justify-center font-semibold text-[12px] sm:text-[18px] bg-gradient-to-r from-blue-400 via-pink-400 to-purple-500 bg-clip-text text-transparent pointer-events-none select-none"
                      >
                        계약수를 입력하세요
                      </motion.span>
                    )}
                    <input
                      type="number"
                      id="contracts"
                      min={0}
                      value={contracts}
                      onChange={(e) => setContracts(e.target.value)}
                      className="relative z-0 w-29 h-8 sm:w-45 sm:h-12 w-full text-right text-[15px] sm:text-[20px] text-black pr-3 rounded-xl border-2 border-blue-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#157CFF] focus:shadow-[0_0_8px_rgba(21,124,255,0.3)]"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <label
                    // style={{
                    //   marginLeft: "20px",
                    // }}
                    htmlFor="contracts"
                    className="ml-3 sm:ml-5 text-[15px] sm:text-[20px] font-bold text-[#157CFF]">
                    환 급 금 :
                  </label>
                  <div
                    style={{ marginRight: "10px" }}
                    className="relative w-32 h-8 sm:w-45 sm:h-12 flex items-center justify-end whitespace-nowrap pr-3 rounded-xl border-2 border-blue-200 bg-white overflow-hidden"
                  >
                    {refund > 0 ? (
                      <span
                        className="text-right font-extrabold text-[#157CFF] w-full text-lg sm:text-xl"
                        style={{
                          fontSize: 'clamp(10px, 4vw, 25px)', // 화면 크기에 따라 자동 조절
                          lineHeight: '1',
                        }}
                      >
                        ₩ {refund.toLocaleString()}
                      </span>
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center font-bold text-2xs sm:text-sm bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent pointer-events-none select-none" />
                    )}
                  </div>
                </div>
              </div>
              <div className="text-[16px] sm:text-[22px] text-[#8e99a6] mb-2 sm:mb-3">
                <div className="flex justify-between font-semibold border-b pb-1 mb-1 sm:mb-1">
                  <span className="ml-[6px] sm:ml-[10px]">월</span>
                  <span className="mr-[6px] sm:mr-[10px]">환급금액</span>
                </div>
                {visibleMonths.map((month, i) => (
                  <div
                    key={month}
                    className="flex justify-between border-b border-gray-100 py-[3px] sm:py-[3px]">
                    <span className="ml-[6px] sm:ml-[10px]">{month}월</span>
                    <span className="mr-[6px] sm:mr-[10px]">
                      {fixedRefunds[i]}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => router.push("/exchangeInquiry")}
                className="w-[180px] mb-[20px] sm:w-full sm:mb-0 
             bg-gradient-to-r from-[#157CFF] to-[#0A60D0] hover:from-[#157CFF] hover:to-[#157CFF] 
             text-white font-semibold text-[15px] sm:text-[25px] py-1.5 sm:py-2 
             rounded-full shadow-lg transition cursor-pointer">
                지금 환급 신청하기
              </button>
            </div>
          </div>
          {/* <div className="absolute top-[19%] sm:top-[10%] left-62 sm:left-170  ml-2 sm:ml-4 w-[130px] sm:w-[220px]">
            <img
              src="/images/helper2.png"
              alt="helper"
              className="w-full h-auto"
            />
          </div> */}
        </div>
      </div>

      {/* 플로팅 버튼 */}
      <div
        ref={btnRef}
        className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end transition-all duration-1000 ease-out transform ${
          btnInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}>
        <button
          className="flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white text-sm font-bold px-4 py-2 pl-3 rounded-full shadow-lg transition"
          onClick={() => router.push("/exchangeInquiry")}>
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-[#0066FF] text-[12px] font-bold">
            <img src="/images/mslogo.png" alt="" />
          </div>
          셀퍼럴 신청
        </button>

        <a
          onClick={(e) => {
            const isMobile = /iPhone|Android/i.test(navigator.userAgent);
            if (isMobile) {
              window.location.href = "kakaoopen://join?l=sPiy9wEh"; // Try to open KakaoTalk app
              setTimeout(() => {
                // Fallback to open web version if app isn't opened
                window.location.href = "https://open.kakao.com/o/sPiy9wEh";
              }, 1500);
            } else {
              // For desktop, just open in new tab
              window.open("https://open.kakao.com/o/sPiy9wEh", "_blank");
            }
            e.preventDefault();
          }}
          href="https://open.kakao.com/o/sPiy9wEh"
          className="flex items-center gap-2 bg-[#FEE500] hover:bg-yellow-400 text-black text-sm font-bold px-4 py-2 rounded-full shadow-lg transition">
          <img
            src="/icons/kakao-talk.png"
            alt="KakaoTalk Icon"
            className="w-5 h-5"
          />
          실시간 상담
        </a>
      </div>
    </section>
  );
}
