"use client";

import { useState } from "react";
import {
  Mail,
  BookOpen,
  Code2,
  Sparkles,
  ExternalLink,
  Share2,
  Check,
  Flame,
} from "lucide-react";

// Lucide에 포함되지 않은 브랜드 아이콘(GitHub, Instagram) 커스텀 SVG 컴포넌트
function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// 프로필 데이터 (수정 및 확장이 용이하도록 구조화)
const PROFILE = {
  name: "윤연서",
  handle: "@yeonseo",
  status: "🌱 바이브 코딩 중",
  bio: "안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다. 🚀\n새로운 기술을 탐구하고 아이디어를 직접 구현하는 과정을 즐깁니다.",
  tags: ["#바이브코딩", "#대학생", "#Next.js", "#AI페어프로그래밍"],
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/yyeonseoo",
      icon: GithubIcon,
      color: "hover:text-zinc-900 dark:hover:text-white",
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: InstagramIcon,
      color: "hover:text-pink-500",
    },
    {
      name: "Blog",
      url: "https://velog.io",
      icon: BookOpen,
      color: "hover:text-emerald-500",
    },
    {
      name: "Email",
      url: "mailto:ysyoon2013@gmail.com",
      icon: Mail,
      color: "hover:text-indigo-500",
    },
  ],
  links: [
    {
      id: "github-repo",
      title: "GitHub 프로젝트 저장소",
      description: "개인 프로젝트 및 잔디 관리 기록",
      url: "https://github.com/yyeonseoo",
      icon: Code2,
      badge: "Active",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      id: "mylink-repo",
      title: "마이링크 (MyLink) 프로젝트",
      description: "바이브 코딩으로 제작한 나만의 프로필 링크 서비스",
      url: "https://github.com/yyeonseoo/my-link",
      icon: Sparkles,
      badge: "Featured",
      badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
      iconBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    },
    {
      id: "tech-blog",
      title: "기술 블로그 & 개발 일기",
      description: "새롭게 배운 지식과 트러블슈팅 경험 공유",
      url: "https://velog.io",
      icon: BookOpen,
      iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      id: "coffee-chat",
      title: "커피챗 & 연락하기",
      description: "협업 제안이나 질문은 언제든지 편하게 보내주세요!",
      url: "mailto:ysyoon2013@gmail.com",
      icon: Mail,
      iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
  ],
};

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${PROFILE.name} | 마이링크`,
          text: PROFILE.bio,
          url,
        });
        return;
      } catch {
        // User cancelled or share failed, fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      alert("링크 복사에 실패했습니다.");
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-indigo-500/20 selection:text-indigo-600">
      {/* 앰비언트 글로우 배경 효과 (Aurora Glow Effect) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-indigo-400/20 via-purple-400/20 to-pink-400/15 dark:from-indigo-600/15 dark:via-purple-600/10 dark:to-pink-600/10 rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/3 w-[420px] h-[420px] bg-gradient-to-br from-blue-400/15 to-emerald-400/15 dark:from-blue-600/10 dark:to-emerald-600/10 rounded-full blur-3xl"
      />

      {/* 프로필 카드 컨테이너 */}
      <div className="relative w-full max-w-md rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-zinc-900/5 dark:shadow-black/40 border border-zinc-200/80 dark:border-zinc-800/90 transition-all duration-300">
        {/* 상단 우측 공유 버튼 */}
        <div className="absolute top-5 right-5">
          <button
            onClick={handleShare}
            aria-label="프로필 링크 공유하기"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-100/90 hover:bg-zinc-200/80 dark:bg-zinc-800/90 dark:hover:bg-zinc-700/80 text-zinc-600 dark:text-zinc-300 transition-all hover:scale-105 active:scale-95 border border-zinc-200/60 dark:border-zinc-700/60 cursor-pointer"
            title="프로필 링크 복사"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500 transition-transform duration-200 scale-110" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* 헤더: 아바타 & 프로필 정보 */}
        <header className="flex flex-col items-center text-center">
          {/* 아바타 (그라데이션 링 + 상태 배지) */}
          <div className="relative mb-4">
            <div className="p-1 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-md shadow-indigo-500/20">
              <div className="w-20 h-20 rounded-full bg-gradient-to-b from-white to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center text-zinc-900 dark:text-zinc-50 text-2xl font-extrabold tracking-wider shadow-inner">
                윤
              </div>
            </div>
            {/* 상태 표시 인디케이터 배지 */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-white dark:bg-zinc-800 text-[11px] font-semibold text-zinc-700 dark:text-zinc-200 shadow-sm border border-zinc-200/80 dark:border-zinc-700 flex items-center gap-1">
              <span>{PROFILE.status}</span>
            </div>
          </div>

          {/* 이름 & 핸들 */}
          <div className="mt-2 flex items-center justify-center gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {PROFILE.name}
            </h1>
            <span
              className="inline-flex items-center text-amber-500"
              title="활동 중인 프로필"
            >
              <Flame className="w-5 h-5 fill-amber-500/20" />
            </span>
          </div>
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5 tracking-wide">
            {PROFILE.handle}
          </p>

          {/* 한 줄 소개 */}
          <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-xs whitespace-pre-line font-normal">
            {PROFILE.bio}
          </p>

          {/* 태그 칩 */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
            {PROFILE.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50 transition-colors hover:border-zinc-300 dark:hover:border-zinc-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 소셜 바로가기 아이콘 바 */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {PROFILE.socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 bg-zinc-100/70 dark:bg-zinc-800/70 border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 transition-all duration-200 hover:scale-110 active:scale-95 ${item.color}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </header>

        {/* 구분선 */}
        <div className="my-6 border-t border-zinc-100 dark:border-zinc-800" />

        {/* 링크 목록 섹션 */}
        <section className="space-y-3">
          {PROFILE.links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3.5 p-3.5 rounded-2xl bg-zinc-50/70 dark:bg-zinc-800/40 hover:bg-white dark:hover:bg-zinc-800/90 border border-zinc-200/70 dark:border-zinc-800 hover:border-indigo-400/80 dark:hover:border-indigo-500/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-left"
              >
                {/* 아이콘 컨테이너 */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${link.iconBg} transition-transform duration-200 group-hover:scale-105`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* 링크 텍스트 & 설명 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {link.title}
                    </span>
                    {link.badge && (
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md border ${link.badgeColor}`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                    {link.description}
                  </p>
                </div>

                {/* 우측 바로가기 화살표 아이콘 */}
                <div className="text-zinc-400 dark:text-zinc-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-all group-hover:translate-x-0.5 shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            );
          })}
        </section>

        {/* 푸터 */}
        <footer className="mt-8 text-center">
          <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wide">
            © 2026 {PROFILE.name} · Powered by{" "}
            <span className="font-semibold text-zinc-600 dark:text-zinc-300">
              mylink
            </span>
          </p>
        </footer>
      </div>

      {/* 링크 복사 토스트 알림 */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900/90 dark:bg-zinc-100/90 text-white dark:text-zinc-900 text-xs font-semibold shadow-xl backdrop-blur-md transition-all duration-300 pointer-events-none ${
          copied
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95"
        }`}
      >
        <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
        <span>프로필 링크가 복사되었습니다! 🎉</span>
      </div>
    </main>
  );
}
