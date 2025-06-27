/** @format */

import { useEffect, useState } from "react";

export default function Toast({
  message,
  type = "success",
  onClose,
}: {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // wait for animation to finish
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: {
      icon: "✅",
      border: "border-green-300",
      text: "text-green-700",
      iconColor: "text-green-500",
    },
    error: {
      icon: "❌",
      border: "border-red-300",
      text: "text-red-700",
      iconColor: "text-red-500",
    },
  }[type];

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999]">
      <div
        className={`transition-all duration-300 ease-in-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
        } bg-white ${
          styles.border
        } px-6 py-4 rounded-xl shadow-xl flex items-center gap-3`}>
        <span className={`text-xl ${styles.iconColor}`}>{styles.icon}</span>
        <div className={`text-sm font-semibold ${styles.text}`}>{message}</div>
      </div>
    </div>
  );
}
