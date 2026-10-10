"use client";

import { useCredits } from "@/lib/useCredits";

export default function CreditBadge() {
  const { remaining, isLoaded, dailyLimit, bonusEarned } = useCredits();

  if (!isLoaded) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-full text-xs font-medium">
        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21h8m-4-4v4m-4-8V7a4 4 0 018 0v6m-8 0h8m-8 0l-2 4h12l-2-4" />
        </svg>
        <span className="text-blue-700">
          {remaining > 0 ? `${remaining} 次` : "已用完"}
        </span>
        {bonusEarned > 0 && (
          <span className="text-green-600 ml-1">+{bonusEarned}</span>
        )}
      </div>
    </div>
  );
}
