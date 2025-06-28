/** @format */
"use client";
import { FaGlobe, FaChartLine, FaRocket, FaShieldAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function AboutCompanySection() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);

    return () => {
      if (leftRef.current) observer.unobserve(leftRef.current);
      if (rightRef.current) observer.unobserve(rightRef.current);
    };
  }, []);

  const { ref: gridRef, inView: gridInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="w-full px-4 py-20 bg-[#d2edff] from-white to-gray-50 text-gray-900 flex flex-col items-center">
      <div className="max-w-7xl w-full space-y-24">
        {/* Row 1 - Main Comparison */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10"> */}
        <div className="flex flex-col sm:flex-row gap-6 max-w-screen-xl mx-auto">
          {/* Meta 셀퍼럴 카드 */}
          <div
            ref={leftRef}
            // className={`bg-gradient-to-br from-white via-pink-50 to-rose-100 border border-rose-200 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 transform ${
            //   isVisible
            //     ? "translate-x-0 opacity-100"
            //     : "-translate-x-10 opacity-0"
            // }`}
            className={`flex-1 bg-gradient-to-br from-white via-pink-50 to-rose-100 border border-rose-200 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <img src="/images/girl.png" alt="icon" className="w-14 h-14" />
              <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 drop-shadow-sm">
                메타 셀퍼럴
              </h2>
            </div>

            {/* Benefit List */}
            <ul className="space-y-4 text-gray-800 text-xs sm:text-xl font-medium bg-white/60 p-5 rounded-2xl shadow-inner backdrop-blur-sm">
              <li>
                🔥 <strong>최대 요율 제공 :</strong> 업계 최고 수준 셀퍼럴 보상
              </li>
              <li>
                🏆 <strong>추천 시스템 :</strong> 분기별 파워거래소 랭킹 반영
              </li>
              <li>
                👩‍💻 <strong>전문 상담 :</strong> 24시간 라이브 서포트
              </li>
              <li>
                💸 <strong>자동 환급 :</strong> 매일 정산되는 수수료 혜택
              </li>
            </ul>
            <img
              style={{
                marginTop: "20px",
              }}
              src="images/rasmm.png"
              alt=""
            />
          </div>

          {/* HEDGEHOOD 카드 - 강조 */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`flex-1 relative bg-gradient-to-br from-white via-blue-50 to-blue-100 border-2 border-blue-300 p-6 rounded-3xl shadow-[0_0_60px_rgba(0,100,255,0.15)] transition-all duration-700 transform`}
          >
            {/* 1 라인 */}
            <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start w-full gap-0 mb-0">
            {/* 왼쪽 섹션 */}
            <section className="flex-1 p-4 w-full sm:w-auto">
              {/* Headline */}
              <div className="flex justify-center sm:justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.5)] overflow-hidden">
                    <img
                      src="/images/hed.png"
                      alt="샘플 이미지"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-[45px] sm:text-5xl md:text-5xl font-extrabold text-blue-800 drop-shadow-md">
                    Hedgehood
                  </h2>
                </div>
              </div>

              {/* Description */}
              <p className="text-[22px] sm:text-xl md:text-xl text-center text-gray-800 mb-1 font-semibold leading-relaxed">
                 <span className="block sm:inline">단 하나! </span>{" "}
                <span className="block sm:inline whitespace-nowrap">
                  <span className="text-blue-600 font-extrabold underline decoration-wavy underline-offset-4">
                    셀퍼럴 수수료 환급
                  </span>{" "}
                  가능한 거래소
                </span>
              </p>
            </section>

            {/* 오른쪽 섹션 */}
            <section className="w-auto flex justify-center sm:justify-start items-center mt-4 sm:mt-0">
              <img
                src="/images/1topp.png"
                alt="샘플 이미지"
                className="w-[120px] h-auto"
              />
            </section>
          </div>

            {/* 2 라인 */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch w-full gap-0 mt-[-8px]">
              {/* 왼쪽 섹션 */}
              <section className="flex-1 p-4 ">
                <ul className="c space-y-3 text-xl sm:text-base md:text-lg text-gray-800 font-medium py-4 rounded-2xl relative z-10">
                  <li>
                    ✅ <strong>평균 스프레드 :</strong>{" "}
                    <span className="text-indigo-600 font-semibold">
                      0.0부터
                    </span>
                  </li>
                  <li>
                    ✅ <strong>최대 레버리지 :</strong>{" "}
                    <span className="text-cyan-600 font-semibold">1:500</span>
                  </li>
                  <li>
                    ✅ <strong>수수료 :</strong>{" "}
                    <span className="text-green-600 font-semibold">$2.5</span>
                  </li>
                  <li>
                    ✅ <strong>매일 자동 페이백</strong>
                  </li>
                  <li>
                    ✅ <strong>24시간 전문 상담</strong>
                  </li>
                </ul>
              </section>

              {/* 오른쪽 섹션 */}
              <section className="flex-1 p-4 flex flex-col justify-end">
                <img
                  src="/images/upto90percent.png"
                  alt="샘플 이미지"
                  className="w-full h-auto object-contain"
                />
              </section>
            </div>

            {/* CTA Button */}
            <div className="mt-1 text-center relative z-10">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/exchangeInquiry")}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-[25px] sm:text-[30px] md:text-[30px] font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-xl transition-all cursor-pointer"
              >
                {/* className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-base sm:text-lg md:text-xl font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-xl transition-all cursor-pointer"> */}
                지금 90% 셀퍼럴 받기
              </motion.button>
              <ul className="text-[20px] sm:text-[25px] mt-3 text-blue-700 font-semibold">
                {/* <p className="text-[30px] sm:text-sm mt-3 text-blue-700 font-semibold"> */}
                단 1분만에 신청 가능
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Row 2 - Horizontal Broker Cards */}
        <div
          ref={gridRef}
          className={`transition-all duration-1000 ease-out transform ${
            gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 flex sm:flex-none flex-nowrap overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 sm:px-0">
            {[
              {
                name: "fpmarkets",
                image: "/images/fpmarket.png",
                평균스프레드: "0.1",
                최대레버리지: "1:100",
                수수료: "$3",
                percent: "30%",
              },
              {
                name: "Vantage",
                image: "/images/vantage.png",
                평균스프레드: "0.0",
                최대레버리지: "1:500",
                수수료: "$3",
                percent: "32%",
              },
              {
                name: "XM",
                image: "/images/xxm.png",
                평균스프레드: "0.1",
                최대레버리지: "1:1000",
                수수료: "$3.5",
                percent: "35%",
              },
              {
                name: "Infinox",
                image: "/images/INFINOX.png",
                평균스프레드: "0.2",
                최대레버리지: "1:100",
                수수료: "$3.5",
                percent: "35%",
              },
              {
                name: "ATFX",
                image: "/images/atfx1.png",
                평균스프레드: "0.09",
                최대레버리지: "1:400",
                수수료: "$3",
                percent: "28%",
              },
              {
                name: "Doo Prime",
                image: "/images/red.png",
                평균스프레드: "0.0",
                최대레버리지: "1:500",
                수수료: "$3",
                percent: "28%",
              },
              { name: "제휴 신청", custom: true, image: "/icons/hand.png" },
              { name: "제휴 신청", custom: true, image: "/icons/hand.png" },
            ].map((item, i) => (
              <div
                key={i}
                className="snap-center min-w-[270px] sm:min-w-0 bg-gradient-to-br from-white to-gray-100 border border-gray-300 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-transform duration-300  mr-4 sm:mr-0"
              >
                {item.custom ? (
                  <div className="flex flex-col items-center justify-center text-center h-full w-full py-6 sm:py-10">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-700 drop-shadow-sm">
                      {item.name}
                      <img
                        src={item.image}
                        alt="promo"
                        className="w-28 sm:w-32 md:w-36 h-auto mb-4 drop-shadow-md"
                      />
                    </h3>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <img
                        style={{
                          borderRadius: "45px",
                        }}
                        src={item.image}
                        alt=""
                        className="w-18 sm:w-22 md:w-16 h-auto mb-4 drop-shadow-md"
                      />
                      <h4 className="text-2xl font-bold text-gray-800">
                        {item.name}
                      </h4>
                    </div>
                    <ul className="text-base text-gray-700 space-y-2">
                      <li className="font-bold text-xl">
                        📊 평균 스프레드 :{" "}
                        <span className="text-indigo-600 font-semibold text-lg drop-shadow-sm">
                          {item.평균스프레드}
                        </span>
                      </li>
                      <li className="font-bold text-xl">
                        📈 최대 레버리지 :{" "}
                        <span className="text-cyan-600 font-semibold text-lg drop-shadow-sm">
                          {item.최대레버리지}
                        </span>
                      </li>
                      <li className="font-bold text-xl">
                        💵 수수료 :{" "}
                        <span className="text-green-600 font-bold text-lg drop-shadow-sm">
                          {item.수수료}
                        </span>
                      </li>
                      <li className="mt-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full px-3 py-1 inline-block font-bold text-lg shadow-md">
                        {item.percent}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
