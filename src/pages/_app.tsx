/** @format */

import { AuthProvider } from "@/context/Auth.Context";
import { ModalProvider } from "@/context/ModalContext";
import { UserProvider } from "@/context/User.Context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UserProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </UserProvider>
    </AuthProvider>
  );
}
