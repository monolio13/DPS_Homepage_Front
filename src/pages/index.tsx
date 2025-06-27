/** @format */

// pages/index.tsx
import Head from "next/head";
import Intro from "@/components/home/introduction";
import AboutCompanySection from "@/components/home/Advertisement";
import UserLayout from "@/components/layout/UserLayout";
import SelfReferralInfo from "@/components/home/SelfReferralInfo";
import HomeScreen from "@/components/home/HomeScreen";
import IphoneRefundPreview from "@/components/home/RefundCalculatorPhone";
import RefundCalculatorPhone from "@/components/home/RefundCalculatorPhone";
import ReviewChat from "@/components/home/ReviewChat";
import SelfReferralNotice from "@/components/home/SelferralNotice";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect } from "react";
import axios from "axios";
import { getVisitorFingerprint } from "@/utils/visitor";
import { UserProvider } from "@/context/User.Context";
import TrackVisitor from "@/components/TrackVisitor";

export default function HomePage() {
  // useEffect(() => {
  //   const visitorId = getOrCreateVisitorId();
  //   axios.post("https://dps-backend-enga.onrender.com/api/track-visitor", {
  //     visitorId,
  //   });
  // }, []);

  // useEffect(() => {
  //   fetch("https://api.metaselferral.com/api/track-visit", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ pathname: window.location.pathname }),
  //   });
  // }, []);

  return (
    <UserLayout>
      <Head>
        <title>
          당신이 찾는 해외선물 거래소, 바로 여기 메타 셀퍼럴에 있습니다.
        </title>
        <meta
          name="description"
          content="대여업체에서 나스닥, 항셍 등 해외선물을 거래하시던 당신, 먹튀 걱정하면서 언제까지 거래하실건가요? 메타 셀퍼럴에서 안전하고, 최저가 수수료로 거래하세요. 인피녹스, 벤티지, xm, 이지스퀘어 같은 메타 거래자 분들도 환영합니다"
        />
        <meta
          name="keywords"
          content="메타,셀퍼럴,대여업체,해외선물,해외선물리딩,나스닥,항셍,미니업체,인피녹스,벤티지,xm,이지스퀘어,해외선물먹튀"
        />
        <meta name="author" content="DPS Meta Selferral Team" />

        {/* Open Graph for link preview (SNS, Telegram, Kakao, etc.) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.metaselferral.com" />
        <meta
          property="og:title"
          content="당신이 찾는 해외선물 거래소, 바로 여기 메타 셀퍼럴에 있습니다."
        />
        <meta
          property="og:description"
          content="대여업체에서 나스닥, 항셍 등 해외선물을 거래하시던 당신, 먹튀 걱정하면서 언제까지 거래하실건가요? 메타 셀퍼럴에서 안전하고, 최저가 수수료로 거래하세요. 인피녹스, 벤티지, xm, 이지스퀘어 같은 메타 거래자 분들도 환영합니다"
        />
        <meta
          property="og:image"
          content="https://www.metaselferral.com/images/homeLogo.jpg"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter card (optional) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="메타 셀퍼럴 - 해외선물 거래소 추천"
        />
        <meta
          name="twitter:description"
          content="먹튀 걱정 없는 안전한 거래, 나스닥/항셍/미니업체 최저 수수료! XM, 벤티지, 이지스퀘어 사용자 환영"
        />
        <meta
          name="twitter:image"
          content="https://www.metaselferral.com/images/homeLogo.jpg"
        />

        {/*    <TrackVisitor />*/}
        <link rel="icon" href="/images/mslogo.png" />
      </Head>
      <HomeScreen />
      <Intro />
      <SelfReferralInfo />
      <AboutCompanySection />
      <ReviewChat />
      <SelfReferralNotice />
    </UserLayout>
  );
}
