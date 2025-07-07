// /** @format */
// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/api";
// import { ChevronDownIcon } from "@heroicons/react/24/outline";
// import Header from "@/components/layout/Header";

// interface QA {
//   _id: string;
//   question: string;
//   answer: string;
// }

// export default function FAQPage() {
//   const [qas, setQAs] = useState<QA[]>([]);
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchQAs = async () => {
//       try {
//         const res = await api.get("/admin/qa"); // use public route
//         setQAs(res.data);
//       } catch (err) {
//         console.error("Failed to fetch Q&As:", err);
//       }
//     };
//     fetchQAs();
//   }, []);

//   const toggleIndex = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <>
//       <Header />
//       <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
//         <section className="max-w-4xl mx-auto">
//           <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-12 leading-tight">
//             FAQ
//           </h2>

//           <div className="space-y-6">
//             {qas.map((qa, index) => (
//               <div
//                 key={qa._id}
//                 className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300">
//                 <button
//                   onClick={() => toggleIndex(index)}
//                   className="w-full flex justify-between items-center px-6 py-5 text-left text-lg sm:text-xl font-medium text-gray-800 hover:bg-gray-50 transition cursor-pointer">
//                   <span>{qa.question}</span>
//                   <ChevronDownIcon
//                     className={`w-6 h-6 transform transition-transform duration-200 ${
//                       openIndex === index ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//                 <div
//                   className={`px-6 pb-5 text-gray-700 text-base transition-all duration-300 ease-in-out ${
//                     openIndex === index
//                       ? "max-h-[1000px] opacity-100"
//                       : "max-h-0 opacity-0 overflow-hidden"
//                   }`}>
//                   <div className="pt-2 border-t">{qa.answer}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }

/** @format */
"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Header from "@/components/layout/Header";

interface QA {
  _id: string;
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [qas, setQAs] = useState<QA[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchQAs = async () => {
      try {
        const res = await api.get("/admin/qa"); // use public route
        setQAs(res.data);
      } catch (err) {
        console.error("Failed to fetch Q&As:", err);
      }
    };
    fetchQAs();
  }, []);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <section className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-12 leading-tight">
            FAQ
          </h2>

          <div className="space-y-6">
            {qas.map((qa, index) => (
              <div
                key={qa._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden transition-all duration-300">
                {/* Question Header */}
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left text-lg sm:text-xl font-semibold text-gray-900 hover:bg-gray-100 transition cursor-pointer">
                  <span>{qa.question}</span>
                  <ChevronDownIcon
                    className={`w-6 h-6 transform transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Animated Answer Box */}
                <div
                  className={`transition-all duration-300 ease-in-out px-6 ${
                    openIndex === index
                      ? "max-h-[1000px] opacity-100 pb-6 pt-3"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-700 text-base leading-relaxed shadow-inner">
                    {qa.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
