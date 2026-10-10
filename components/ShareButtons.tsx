"use client";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: "LINE",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125c0 .345-.282.63-.63.63-.346 0-.627-.285-.627-.63V11.12h-1.125c-.345 0-.63-.285-.63-.63 0-.345.285-.63.63-.63h1.125V8.734c0-.345.282-.63.63-.63.345 0 .63.285.63.63v1.125h1.752zm-2.52 3.501h1.122c.345 0 .627.285.627.63 0 .345-.282.63-.63.63h-1.122c-.345 0-.63-.285-.63-.63 0-.345.285-.63.63-.63zm2.523-5.627H4.632c-1.455 0-2.64 1.185-2.64 2.64v5.25c0 1.455 1.185 2.64 2.64 2.64h14.736c1.455 0 2.64-1.185 2.64-2.64v-5.25c0-1.455-1.185-2.64-2.64-2.64zM12 15.765c-3.09 0-5.715-1.785-5.715-3.99 0-.345.285-.63.63-.63.345 0 .63.285.63.63 0 1.515 2.055 2.73 4.455 2.73s4.455-1.215 4.455-2.73c0-.345.285-.63.63-.63.345 0 .63.285.63.63 0 2.205-2.625 3.99-5.715 3.99z"/>
        </svg>
      ),
      href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-blue-700 hover:bg-blue-800",
    },
    {
      name: "Facebook",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "X",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "bg-gray-900 hover:bg-black",
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    alert("連結已複製！");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        // User cancelled
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {/* Desktop share buttons */}
      <div className="hidden sm:flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 ${link.color} text-white rounded-lg text-sm font-medium transition`}
          >
            {link.icon}
            {link.name}
          </a>
        ))}
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          複製連結
        </button>
      </div>

      {/* Mobile native share */}
      <div className="sm:hidden">
        <button
          onClick={handleNativeShare}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition w-full justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          分享文章
        </button>
      </div>
    </div>
  );
}
