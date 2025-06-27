/** @format */

"use client";

import { createContext, useContext, useState } from "react";

interface ModalContextType {
  isTermsOpen: boolean;
  openTerms: () => void;
  closeTerms: () => void;
  isTermsOpen2: boolean;
  openTerms2: () => void;
  closeTerms2: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isTermsOpen2, setIsTermsOpen2] = useState(false);

  const openTerms = () => setIsTermsOpen(true);
  const openTerms2 = () => setIsTermsOpen2(true);
  const closeTerms = () => setIsTermsOpen(false);
  const closeTerms2 = () => setIsTermsOpen2(false);
  2;

  return (
    <ModalContext.Provider
      value={{
        isTermsOpen,
        openTerms,
        closeTerms,
        openTerms2,
        closeTerms2,
        isTermsOpen2,
      }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
};
