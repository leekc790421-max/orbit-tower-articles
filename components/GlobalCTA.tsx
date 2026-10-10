export default function GlobalCTA() {
  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-6">
        <div className="glass-card-dark rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            下一代企業門面，不再只是靜態網站。
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
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
          <p className="text-gray-400 text-sm mt-4">
            探索 AI Digital Headquarters 的未來樣貌
          </p>
        </div>
      </div>
    </section>
  );
}
