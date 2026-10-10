"use client";

import { useState } from "react";

export default function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // TODO: 串接後端 API 儲存 email
    }
  };

  if (submitted) {
    return (
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 mb-12 border border-green-200 text-center">
        <svg className="w-12 h-12 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          感謝您的訂閱！
        </h3>
        <p className="text-gray-600">
          報告將稍後寄送至您的信箱。
        </p>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 mb-12 border border-blue-200">
      <div className="text-center mb-6">
        <span className="text-3xl mb-3 block">🎁</span>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          免費下載《2026 AI數位展示館趨勢報告》
        </h3>
        <p className="text-gray-600">
          掌握次世代品牌門面轉型關鍵，輸入 Email 立即取得完整 PDF 報告。
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="輸入您的 Email"
          required
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
        >
          立即下載
        </button>
      </form>
    </section>
  );
}
