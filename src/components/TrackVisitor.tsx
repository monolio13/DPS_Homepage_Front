/** @format */

"use client";

import { useEffect } from "react";

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
}
