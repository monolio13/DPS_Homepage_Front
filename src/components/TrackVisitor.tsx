/** @format */

"use client";

import { useEffect } from "react";

/*
export default function TrackVisitor() {
  useEffect(() => {
    const fingerprint =
      navigator.userAgent + "_" + screen.width + "x" + screen.height;

    fetch("https://api.metaselferral.com/api/visitors/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fingerprint }),
    });
  }, []);

  return null;
}*/

export default function TrackVisitor() {
  useEffect(() => {
    const collectVisitorInfo = async () => {
      // 1. User Agent 기반 정보
      const userAgent = navigator.userAgent;
      const isMobile = /mobile/i.test(userAgent);
      const deviceType = isMobile ? "Mobile" : "Desktop";

      let browser = "Unknown";
      if (userAgent.includes("Chrome")) browser = "Chrome";
      else if (userAgent.includes("Safari")) browser = "Safari";
      else if (userAgent.includes("Firefox")) browser = "Firefox";
      else if (userAgent.includes("Edg")) browser = "Edge";

      // 2. IP 및 위치 정보 가져오기
      const ipRes = await fetch("https://ipapi.co/json/");
      const ipData = await ipRes.json();

      // 3. 시간 및 기타 정보
      const visitTime = new Date().toISOString();
      const referer = document.referrer || "직접 접속";

      // 4. 고유 식별자 (기존 fingerprint 방식 유지)
      const fingerprint =
        userAgent + "_" + screen.width + "x" + screen.height;

      // 5. 백엔드로 전송
      await fetch("https://api.metaselferral.com/api/visitors/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fingerprint,
          visitTime,
          deviceType,
          browser,
          ip: ipData.ip,
          country: ipData.country_name,
          referer,
        }),
      });
    };

    collectVisitorInfo();
  }, []);

  return null;
}
