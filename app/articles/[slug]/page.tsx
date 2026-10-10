import { articles, getArticleBySlug } from "@/data/articles";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";
import LeadMagnet from "@/components/LeadMagnet";
import FissionModule from "@/components/FissionModule";
import GlobalCTA from "@/components/GlobalCTA";
import ArticleGate from "@/components/ArticleGate";
import CreditBadge from "@/components/CreditBadge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const url = `https://articles.xingdeng.tw/articles/${slug}`;

  return {
    title: article.meta_title,
    description: article.summary,
    keywords: article.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title: article.og_title,
      description: article.summary,
      url: url,
      siteName: "Orbit Tower 未來企業趨勢",
      locale: "zh_TW",
      images: [
        {
          url: `${url}/og-image`,
          width: 1200,
          height: 630,
          alt: article.og_title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.og_title,
      description: article.summary,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = article.related
    .map((id) => articles.find((a) => a.id === id))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.h1,
    description: article.summary,
    url: `https://articles.xingdeng.tw/articles/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "Orbit Tower",
      url: "https://articles.xingdeng.tw",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...article.faq.core, ...article.faq.extra].map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <ArticleGate slug={slug} articleTitle={article.h1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">OT</span>
              </div>
              <span className="font-semibold text-gray-900">Orbit Tower</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm text-gray-600">
              <CreditBadge />
              <a href="https://orbit.xingdeng.tw" className="hover:text-blue-600 transition">
                體驗展示館
              </a>
            </nav>
          </div>
        </header>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto px-6 py-12">
          {/* Article Header */}
          <header className="mb-12">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-4">
              {String(article.id).padStart(2, "0")}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.h1}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {article.summary}
            </p>
          </header>

          {/* 60秒重點摘要 */}
          <section className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-10 border border-blue-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              60 秒重點摘要
            </h2>
            <p className="text-gray-700">{article.summary}</p>
          </section>

          {/* 前言 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">前言</h2>
            <p className="text-gray-700 leading-relaxed">{article.sections.intro}</p>
          </section>

          {/* 產業現況 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">產業現況</h2>
            <p className="text-gray-700 leading-relaxed">{article.sections.industry}</p>
          </section>

          {/* 目前面臨問題 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">目前面臨問題</h2>
            <p className="text-gray-700 leading-relaxed">{article.sections.problems}</p>
          </section>

          {/* 未來趨勢分析 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">未來趨勢分析</h2>
            <p className="text-gray-700 leading-relaxed">{article.sections.trends}</p>
          </section>

          {/* 案例觀察 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">案例觀察</h2>
            <p className="text-gray-700 leading-relaxed">{article.sections.cases}</p>
          </section>

          {/* 中段體驗鉤子 */}
          <section className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-8 my-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-3">
              想看看未來企業展示館實際長什麼樣子？
            </h3>
            <p className="text-blue-100 mb-5">
              Orbit Tower 將 AI、3D 展示與品牌體驗整合為全新的數位總部模式。
            </p>
            <a
              href="https://orbit.xingdeng.tw"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
            >
              立即體驗 Orbit Tower 3D 展示館
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </section>

          {/* 可能的解決方案 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">可能的解決方案</h2>
            <p className="text-gray-700 leading-relaxed">{article.sections.solutions}</p>
          </section>

          {/* 裂變模組 */}
          <FissionModule question={article.mid_hook.question} />

          {/* Orbit Tower 觀點 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Orbit Tower 觀點</h2>
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-600">
              <p className="text-gray-700 leading-relaxed italic">
                {article.orbit_view}
              </p>
            </div>
          </section>

          {/* 結論 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">結論</h2>
            <p className="text-gray-700 leading-relaxed">{article.conclusion}</p>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">常見問題 FAQ</h2>

            <div className="space-y-4">
              {[...article.faq.core, ...article.faq.extra].map((item, idx) => (
                <details
                  key={idx}
                  className="group bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition">
                    <span className="font-medium text-gray-900">{item.q}</span>
                    <svg
                      className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Lead Magnet */}
          <LeadMagnet />

          {/* 分享討論區 */}
          <section className="bg-gray-50 rounded-xl p-6 mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">分享討論區</h3>
            <p className="text-gray-600 mb-4">
              如果你是：創辦人、品牌主管、行銷主管、業務主管
              <br />
              歡迎將本文分享給團隊成員一起討論。下一代企業展示方式可能比你想像得更快到來。
            </p>
            <ShareButtons title={article.h1} url={`https://articles.xingdeng.tw/articles/${slug}`} />
          </section>

          {/* 延伸閱讀 */}
          {relatedArticles.length > 0 && (
            <section className="mb-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">延伸閱讀</h3>
              <div className="grid gap-4">
                {relatedArticles.map((related) =>
                  related ? (
                    <Link
                      key={related.id}
                      href={`/articles/${related.slug}`}
                      className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition"
                    >
                      <span className="text-xs text-blue-600 font-medium">
                        {String(related.id).padStart(2, "0")}
                      </span>
                      <h4 className="font-medium text-gray-900 hover:text-blue-600 transition">
                        {related.h1}
                      </h4>
                    </Link>
                  ) : null
                )}
              </div>
            </section>
          )}
        </article>

        {/* 全站終極 CTA */}
        <GlobalCTA />

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-8">
          <div className="max-w-3xl mx-auto px-6 text-center text-sm">
            <p>&copy; 2026 Orbit Tower. AI-Powered Digital Headquarters.</p>
          </div>
        </footer>
      </main>
    </ArticleGate>
  );
}
