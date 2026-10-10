"use client";

import { useEffect, useState } from "react";
import { useCredits } from "@/lib/useCredits";
import CreditWall from "./CreditWall";

interface ArticleGateProps {
  slug: string;
  articleTitle: string;
  children: React.ReactNode;
}

export default function ArticleGate({ slug, articleTitle, children }: ArticleGateProps) {
  const { remaining, canRead, isLoaded, consumeCredit } = useCredits();
  const [showWall, setShowWall] = useState(false);
  const [hasConsumed, setHasConsumed] = useState(false);

  useEffect(() => {
    if (!isLoaded || hasConsumed) return;

    // Consume credit for this article
    consumeCredit(slug);
    setHasConsumed(true);

    // Check if wall should show (after consuming, if remaining is 0)
    // We need to check after consumption
    setTimeout(() => {
      const raw = localStorage.getItem("orbit_credits");
      if (raw) {
        try {
          const data = JSON.parse(raw);
          const today = new Date().toISOString().slice(0, 10);
          if (data.date === today) {
            const used = data.freeUsed || 0;
            const bonus = data.bonusEarned || 0;
            const limit = 3;
            const maxBonus = 5;
            const remaining = Math.max(0, limit - used + bonus);
            if (remaining <= 0) {
              setShowWall(true);
            }
          }
        } catch {
          // ignore
        }
      }
    }, 100);
  }, [isLoaded, hasConsumed, slug, consumeCredit]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">載入中...</div>
      </div>
    );
  }

  return (
    <>
      {children}
      {showWall && <CreditWall slug={slug} articleTitle={articleTitle} />}
    </>
  );
}
