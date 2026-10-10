import Link from "next/link";
import { articles } from "@/data/articles";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">OT</span>
            </div>
            <span className="font-semibold text-gray-900">Orbit Tower</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm text-gray-600">
            <a href="https://orbit.xingdeng.tw" className="hover:text-blue-600 transition">
              體驗展示館
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            未來企業展示方式的演化
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            探索 AI 數位展示館、3D 品牌展示與沉浸式體驗的趨勢洞察。
            <br />
            從平面網頁走向三維空間，官網將轉變為具備高轉換率的數位旗艦展示終端。
          </p>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">最新文章</h2>
          <div className="grid gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="block bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded mb-3">
                      {String(article.id).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition">
                      {article.h1}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-gray-400 mt-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="bg-gradient-to-br from-blue-600 to-cyan-600 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            免費下載《2026 AI數位展示館趨勢報告》
          </h2>
          <p className="text-blue-100 mb-8">
            掌握次世代品牌門面轉型關鍵，輸入 Email 立即取得完整 PDF 報告。
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="輸入您的 Email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
            >
              立即下載
            </button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            下一代企業門面，不再只是靜態網站。
          </h2>
          <p className="text-gray-600 mb-8">
            AI 接待、3D 展示、多語品牌體驗，正在重新定義企業與客戶的互動方式。
          </p>
          <a
            href="https://orbit.xingdeng.tw"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            立即體驗 Orbit Tower
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm">
          <p>&copy; 2026 Orbit Tower. AI-Powered Digital Headquarters.</p>
        </div>
      </footer>
    </main>
  );
}
