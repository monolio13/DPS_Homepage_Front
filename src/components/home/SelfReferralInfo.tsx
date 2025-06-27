/** @format */

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export default function SelfReferralInfo() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const cardRef = useRef(null);
  const cardRef2 = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showOverlay2, setShowOverlay2] = useState(false);
  const [delayTrigger, setDelayTrigger] = useState(false);
  const [delayTrigger2, setDelayTrigger2] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timeout = setTimeout(() => {
              setDelayTrigger(true);
              setShowOverlay(true);
            }, 2000);

            return () => clearTimeout(timeout);
          } else {
            setDelayTrigger(false);
            setShowOverlay(false);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    const el = cardRef2.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timeout = setTimeout(() => {
              setDelayTrigger2(true);
              setShowOverlay2(true);
            }, 2000);

            return () => clearTimeout(timeout);
          } else {
            setDelayTrigger2(false);
            setShowOverlay2(false);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

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

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      if (!playerRef.current && iframeRef.current) {
        playerRef.current = new window.YT.Player(iframeRef.current, {
          events: {
            onReady: (e: any) => {
              e.target.mute();
            },
          },
        });
      }
    };
  }, []);

  const handleMouseEnter = () => {
    playerRef.current?.playVideo();
  };

  const handleMouseLeave = () => {
    playerRef.current?.pauseVideo();
  };

  const videoOffset = Math.max(50 - (offsetY - 500), 0);
  const videoOpacity = Math.min(Math.max((offsetY - 450) / 50, 0), 1);

  const { ref: explainRef, inView: explainInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-12 bg-white text-[#4d4e59]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Text & Table Section */}
        <div className="flex flex-col gap-10">
          <div className="bg-gradient-to-br from-[#e6f0ff] via-white to-[#dceeff] rounded-3xl shadow-2xl px-4 py-8 sm:px-10 sm:py-12 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 ">
            <img
              src="/images/selferral.png"
              alt="설명"
              className="w-32 sm:w-44 md:w-52 lg:w-60 drop-shadow-lg transition-transform hover:scale-105"
            />
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 sm:mb-4">
                셀퍼럴이란?
              </h2>
              <p className="text-base sm:text-lg md:text-3xl font-extrabold leading-relaxed">
                셀퍼럴이란{" "}
                <span className="text-[#157CFF] font-extrabold">
                  추천인 코드
                </span>
                를 통해 발생하는 수수료를,
                <br className="hidden sm:block" />
                <span className="text-[#157CFF] font-extrabold">
                  추천인이 아닌 본인
                </span>
                에게 돌려주는 구조입니다.
              </p>
            </div>
            <button
              onClick={() => router.push("/exchangeInquiry")}
              className="mt-5 sm:mt-0 bg-[#157CFF] text-white text-sm sm:text-lg font-bold px-5 sm:px-10 py-2 sm:py-3 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer">
              셀퍼럴 신청
            </button>
          </div>

          {/* First Two Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#eef6ff] to-white rounded-3xl shadow-xl px-4 py-8 sm:px-8 sm:py-10">
              <div className="relative mb-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  셀퍼럴을 선택해야 하는 이유?
                </h3>
                {/* <img
                src="/images/search.png"
                alt="Search Icon"
                className="
                absolute
                w-30 sm:w-28 md:w-32 lg:w-40 xl:w-44
                left-[76%] sm:left-[88%] md:left-[90%] lg:left-[71%]
                -translate-x-1/2
                -top-9 sm:-top-8 md:-top-12
              "
              /> */}
              </div>
              <p className="text-xs sm:text-lg md:text-2xl font-medium leading-relaxed whitespace-pre-line">
                <span className="block">
                  <span className="text-[#157CFF] font-bold">국내거래소는</span> 업체별로 수수료 및 거래 플랫폼이
                </span>
                <span className="block">
                  다양하기 때문에 트레이더가 조건을 비교해
                </span>
                <span className="block">
                  자신에게 맞는 업체를 선택합니다.
                </span>
                <br />
                <span className="block">
                  <span className="text-[#157CFF] font-bold">해외거래소는</span> 동일한 거래 플랫폼 MT5를 사용함으로
                </span>
                <span className="block">
                  셀퍼럴로 최저수수료를 받을 수 있는 업체를 선택해야
                </span>
                <span className="block">
                  합니다.
                </span>                
              </p>
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => router.push("/exchangeInquiry")}
                  className="mt-4 sm:mt-0 bg-[#157CFF] text-white text-sm sm:text-lg font-bold px-5 sm:px-7 py-2 sm:py-3 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer">
                  셀퍼럴 확인하기
                </button>
              </div>
            </div>
            <div
              style={{
                marginTop: "-30px",
              }}
              ref={cardRef}
              className="relative w-full max-w-md mx-auto aspect-[3/4] overflow-hidden rounded-xl">
              <img
                src="/images/nima.png"
                alt="bg"
                className="w-full h-full object-cover"
              />
              <img
                src="/images/tar.png"
                className={`absolute top-1/2 left-1/2 w-full h-auto z-20 object-contain transform transition-all duration-1000 ease-out ${
                  delayTrigger
                    ? "opacity-100 -rotate-[30deg] scale-100 -translate-x-1/2 -translate-y-1/2"
                    : "opacity-0 -rotate-[45deg] scale-75 -translate-x-1/2 -translate-y-1/2"
                }`}
                style={{ transformOrigin: "center" }}
                alt="overlay"
              />

              <div className="absolute top-1/3 left-[25%] flex flex-col gap-4 text-left">
                {[
                  { img: "키움.png", name: "키움증권", color: "#f64898" },
                  { img: "desin.png", name: "대신증권", color: "#02b194" },
                  { img: "mirte.png", name: "미래에셋", color: "#f8b80d" },
                  { img: "hang.png", name: "한국투자", color: "#a5352e" },
                  { img: "대.png", name: "대여업체", color: "#f88c10" },
                ].map(({ img, name, color }) => (
                  <div key={name} className="flex items-center gap-4 flex-wrap">
                    <img
                      src={`/images/${img}`}
                      alt={name}
                      className="w-8 sm:w-10 h-auto"
                    />
                    <span className="text-[#333] font-extrabold text-lg sm:text-2xl">
                      {name}
                    </span>
                    <span
                      className="ml-4 font-extrabold text-lg sm:text-2xl"
                      style={{ color }}>
                      HTS
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Second Two Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          <div
            ref={cardRef2}
            className="relative w-full max-w-md mx-auto aspect-[3/4] overflow-hidden rounded-xl">
            <img
              src="/images/nima.png"
              alt="bg"
              className="w-full h-full object-cover"
            />
            <img
              src="/images/kat.png"
              className={`absolute top-1/2 left-1/2 w-full h-auto z-20 object-contain transform transition duration-1000 ease-out ${
                delayTrigger2
                  ? "opacity-100 -rotate-[30deg] scale-100 -translate-x-1/2 -translate-y-1/2"
                  : "opacity-0 -rotate-[45deg] scale-75 -translate-x-1/2 -translate-y-1/2"
              }`}
              style={{ transformOrigin: "center" }}
              alt="overlay"
            />

            <div className="absolute top-1/3 left-[25%] flex flex-col gap-4 text-left z-10">
              {[
                { img: "fpmarket.png", name: "FPmarket" },
                { img: "vantage.png", name: "Vantage" },
                { img: "xxm.png", name: "XM" },
                {
                  img: "hed.png",
                  name: "Hedgehood",
                  bold: true,
                  color: "",
                },
                { img: "in.png", name: "INFINOX" },
              ].map(({ img, name, bold, color }) => (
                <div key={name} className="flex items-center gap-4">
                  <img
                    src={`/images/${img}`}
                    alt={name}
                    className="w-8 sm:w-10 h-auto rounded-[12px]"
                  />
                  <span
                    className={`text-[#333] ${
                      bold ? "font-extrabold" : "font-semibold"
                    } text-lg sm:text-2xl`}>
                    {color ? (
                      <>
                        <span style={{ color }}>
                          {name.split(/(?=[A-Z])/)[0]}
                        </span>
                        {name.split(/(?=[A-Z])/)[1]}
                      </>
                    ) : (
                      name
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl aspect-video mx-auto mt-22"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <iframe
              ref={iframeRef}
              className="w-full h-full"
              src="https://www.youtube.com/embed/NF2qU5nhzV8?enablejsapi=1&start=25&mute=1&playsinline=1"
              title="레퍼럴 vs 셀퍼럴"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
