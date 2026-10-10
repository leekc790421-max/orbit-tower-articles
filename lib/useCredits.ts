"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "orbit_credits";
const REFERRAL_KEY = "orbit_referral";

interface CreditData {
  date: string; // YYYY-MM-DD
  freeUsed: number;
  bonusEarned: number;
  sharedArticles: string[]; // slugs already shared for bonus
}

const FREE_DAILY_LIMIT = 3;
const BONUS_PER_SHARE = 1;
const MAX_BONUS_PER_DAY = 5;

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function getInitialCredits(): CreditData {
  return {
    date: getTodayKey(),
    freeUsed: 0,
    bonusEarned: 0,
    sharedArticles: [],
  };
}

function loadCredits(): CreditData {
  if (typeof window === "undefined") return getInitialCredits();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialCredits();

    const data: CreditData = JSON.parse(raw);

    // Reset if new day
    if (data.date !== getTodayKey()) {
      return getInitialCredits();
    }

    return data;
  } catch {
    return getInitialCredits();
  }
}

function saveCredits(data: CreditData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useCredits() {
  const [credits, setCredits] = useState<CreditData>(getInitialCredits());
  const [isLoaded, setIsLoaded] = useState(false);
  const [referralCode, setReferralCode] = useState<string>("");

  // Load from localStorage on mount
  useEffect(() => {
    setCredits(loadCredits());
    setIsLoaded(true);

    // Check for referral code in URL
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferralCode(ref);
      localStorage.setItem(REFERRAL_KEY, ref);
    } else {
      const storedRef = localStorage.getItem(REFERRAL_KEY);
      if (storedRef) setReferralCode(storedRef);
    }
  }, []);

  const remaining = Math.max(
    0,
    FREE_DAILY_LIMIT - credits.freeUsed + credits.bonusEarned
  );

  const canRead = remaining > 0;

  const consumeCredit = useCallback(
    (slug: string) => {
      const current = loadCredits();

      // Already read this article today? Don't consume
      if (current.sharedArticles.includes(`read_${slug}`)) {
        return;
      }

      if (current.freeUsed < FREE_DAILY_LIMIT) {
        current.freeUsed += 1;
      } else if (current.bonusEarned < FREE_DAILY_LIMIT + MAX_BONUS_PER_DAY) {
        // Use bonus credits
        // bonus is already tracked, just allow
      }

      current.sharedArticles.push(`read_${slug}`);
      saveCredits(current);
      setCredits({ ...current });
    },
    []
  );

  const earnBonusByShare = useCallback(
    (slug: string) => {
      const current = loadCredits();
      const shareKey = `share_${slug}`;

      // Already shared this article
      if (current.sharedArticles.includes(shareKey)) {
        return false;
      }

      // Max bonus reached
      if (current.bonusEarned >= MAX_BONUS_PER_DAY) {
        return false;
      }

      current.bonusEarned += BONUS_PER_SHARE;
      current.sharedArticles.push(shareKey);
      saveCredits(current);
      setCredits({ ...current });
      return true;
    },
    []
  );

  const getReferralUrl = useCallback(
    (slug?: string) => {
      const code = referralCode || generateReferralCode();
      const base = slug
        ? `https://articles.xingdeng.tw/articles/${slug}`
        : "https://articles.xingdeng.tw";
      return `${base}?ref=${code}`;
    },
    [referralCode]
  );

  return {
    credits,
    remaining,
    canRead,
    isLoaded,
    consumeCredit,
    earnBonusByShare,
    getReferralUrl,
    referralCode,
    freeUsed: credits.freeUsed,
    bonusEarned: credits.bonusEarned,
    dailyLimit: FREE_DAILY_LIMIT,
    maxBonus: MAX_BONUS_PER_DAY,
  };
}

function generateReferralCode(): string {
  let code = localStorage.getItem("orbit_my_referral");
  if (!code) {
    code = "OT" + Math.random().toString(36).substring(2, 8).toUpperCase();
    localStorage.setItem("orbit_my_referral", code);
  }
  return code;
}
