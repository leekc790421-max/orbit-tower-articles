"use client";

import { useState } from "react";
import { useCredits } from "@/lib/useCredits";

interface CreditWallProps {
  slug: string;
  articleTitle: string;
}

export default function CreditWall({ slug, articleTitle }: CreditWallProps) {
  const {
    remaining,
    canRead,
    isLoaded,
    consumeCredit,
    earnBonusByShare,
    getReferralUrl,
    freeUsed,
    bonusEarned,
    dailyLimit,
    maxBonus,
  } = useCredits();

  const [justShared, setJustShared] = useState(false);
  const [showWall, setShowWall] = useState(false);

  // Consume credit on mount
  useState(() => {
    if (isLoaded) {
      consumeCredit(slug);
    }
  });

  // Show wall if no credits after consumption
  if (!isLoaded) return null;

  const handleLineShare = async () => {
    const referralUrl = getReferralUrl(slug);
    const shareText = `${articleTitle}\n\n${referralUrl}`;
    const encodedUrl = encodeURIComponent(referralUrl);
    const encodedText = encodeURIComponent(shareText);

    // Open LINE share
    window.open(
      `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedText}`,
      "_blank",
      "width=600,height=500"
    );

    // Award bonus
    const success = earnBonusByShare(slug);
    if (success) {
      setJustShared(true);
      setTimeout(() => {
        setJustShared(false);
        setShowWall(false);
      }, 2000);
    }
  };

  const handleCopyLink = async () => {
    const referralUrl = getReferralUrl(slug);
    await navigator.clipboard.writeText(referralUrl);

    const success = earnBonusByShare(slug);
    if (success) {
      setJustShared(true);
      setTimeout(() => {
        setJustShared(false);
        setShowWall(false);
      }, 2000);
    }
  };

  // If can read, don't show wall
  if (canRead && !showWall) {
    return null;
  }

  // Show the wall
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" />

        {/* Success state */}
        {justShared ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">解鎖成功！</h3>
            <p className="text-gray-600">已獲得額外閱讀額度，繼續享受內容。</p>
          </div>
        ) : (
          <>
            {/* Bottle icon */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21h8m-4-4v4m-4-8V7a4 4 0 018 0v6m-8 0h8m-8 0l-2 4h12l-2-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                瓶中信 Credit Wall
              </h3>
              <p className="text-gray-600 text-sm">
                今日免費額度已用完
              </p>
            </div>

            {/* Credit status */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">免費額度</span>
                <span className="font-medium text-gray-900">
                  {freeUsed} / {dailyLimit}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-600">分享解鎖</span>
                <span className="font-medium text-green-600">
                  +{bonusEarned} / {maxBonus}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, ((freeUsed + bonusEarned) / (dailyLimit + maxBonus)) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Share to unlock */}
            <div className="space-y-3">
              <p className="text-center text-sm text-gray-700 font-medium">
                分享本文至 LINE 群組，解鎖閱讀額度
              </p>

              {/* LINE Share Button */}
              <button
                onClick={handleLineShare}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#06C755] hover:bg-[#05b04c] text-white rounded-xl font-semibold transition shadow-lg shadow-green-500/20"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125c0 .345-.282.63-.63.63-.346 0-.627-.285-.627-.63V11.12h-1.125c-.345 0-.63-.285-.63-.63 0-.345.285-.63.63-.63h1.125V8.734c0-.345.282-.63.63-.63.345 0 .63.285.63.63v1.125h1.752zm-2.52 3.501h1.122c.345 0 .627.285.627.63 0 .345-.282.63-.63.63h-1.122c-.345 0-.63-.285-.63-.63 0-.345.285-.63.63-.63zm2.523-5.627H4.632c-1.455 0-2.64 1.185-2.64 2.64v5.25c0 1.455 1.185 2.64 2.64 2.64h14.736c1.455 0 2.64-1.185 2.64-2.64v-5.25c0-1.455-1.185-2.64-2.64-2.64zM12 15.765c-3.09 0-5.715-1.785-5.715-3.99 0-.345.285-.63.63-.63.345 0 .63.285.63.63 0 1.515 2.055 2.73 4.455 2.73s4.455-1.215 4.455-2.73c0-.345.285-.63.63-.63.345 0 .63.285.63.63 0 2.205-2.625 3.99-5.715 3.99z"/>
                </svg>
                分享至 LINE 群組（+1 額度）
              </button>

              {/* Copy Referral Link */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                複製 Referral 連結（+1 額度）
              </button>
            </div>

            {/* Footer note */}
            <p className="text-center text-xs text-gray-400 mt-6">
              每日 00:00 重置免費額度
            </p>
          </>
        )}
      </div>
    </div>
  );
}
