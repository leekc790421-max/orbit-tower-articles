"use client";

import ShareButtons from "./ShareButtons";

interface FissionModuleProps {
  question: string;
}

export default function FissionModule({ question }: FissionModuleProps) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const currentTitle = typeof document !== "undefined" ? document.title : "";

  return (
    <section className="my-12">
      <div className="border-t-2 border-b-2 border-blue-200 py-8 px-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
        <p className="text-center text-lg font-medium text-gray-900 mb-4">
          {question}
        </p>
        <p className="text-center text-gray-600 mb-6">
          歡迎分享本文給團隊夥伴與業界朋友一起討論：
        </p>
        <div className="flex justify-center">
          <ShareButtons title={currentTitle} url={currentUrl} />
        </div>
      </div>
    </section>
  );
}
