/** @format */

import { useModal } from "@/context/ModalContext";
import Header from "./Header";
import TermsModal from "../home/TermsModal";
import TermsModal2 from "../home/TermsModal2";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isTermsOpen } = useModal();
  const { isTermsOpen2 } = useModal();
  const { openTerms } = useModal();
  const { openTerms2 } = useModal();

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden min-h-screen flex flex-col bg-white text-white">
      <Header />
      <main className="flex-grow pt-[100px]">{children}</main>
      <footer className="bg-gray-900 text-gray-300 text-sm px-4 py-8 border-t border-gray-700">
        <div className="max-w-6xl mx-auto space-y-4">
          <h2 className="text-xl font-extrabold text-[#157CFF]">
            Metaselferral
          </h2>

          <div className="space-y-1 leading-relaxed">
            <p>사업자번호 : 183-36-01415</p>
            <p>
              소재지 : 4th Floor, 398, Seocho-daero, Seocho-gu, Seoul, Republic of Korea
            </p>
            <p>고객 센터 : 채팅 상담 (09:00 ~ 24:00)</p>
            <p>
              E-mail :{" "}
              <a
                href="mailto:cs@metaselferral.com"
                className="text-blue-400 hover:underline">
                cs@metaselferral.com
              </a>
            </p>
          </div>

          <div className=" flex-col sm:flex-row  items-center pt-4 border-t border-gray-700 text-xs text-gray-400">
            <p className="mb-2 sm:mb-2">
              copyright {new Date().getFullYear()} | metaselferral | All Rights
              Reserved.
            </p>
            <div className="space-x-4 underline underline-offset-2">
              <button
                onClick={openTerms}
                className="underline hover:text-white cursor-pointer">
                이용약관
              </button>
              <button
                onClick={openTerms2}
                className="underline hover:text-white cursor-pointer">
                개인정보처리방침
              </button>
            </div>
          </div>
        </div>
      </footer>
      {isTermsOpen && <TermsModal />}
      {isTermsOpen2 && <TermsModal2 />}
    </div>
  );
}
