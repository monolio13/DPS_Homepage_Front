/** @format */

// utils/visitor.ts
// export function getOrCreateVisitorId() {
//   let id = localStorage.getItem("visitor_id");
//   if (!id) {
//     id = crypto.randomUUID();
//     localStorage.setItem("visitor_id", id);
//   }
//   return id;
// }

import FingerprintJS from "@fingerprintjs/fingerprintjs";

// Generate a unique fingerprint based on device/browser characteristics
export async function getVisitorFingerprint(): Promise<string> {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId; // this is a stable, anonymous hash
}
