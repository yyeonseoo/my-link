"use client";

import { useState } from "react";
import {
  Mail,
  BookOpen,
  Code2,
  Sparkles,
  ChevronRight,
  Share2,
  Check,
} from "lucide-react";

// Lucide에 미포함된 GitHub, Instagram 브랜드 아이콘
function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// 토스 보이스앤톤(해요체) 및 TDS 컬러 체계 적용 데이터
const PROFILE = {
  name: "윤연서",
  handle: "@yeonseo",
  status: "🌱 지금 바이브 코딩 공부 중이에요",
  headline: "안녕하세요,\n윤연서예요",
  bio: "바이브 코딩을 배우고 있어요.\n새로운 기술을 탐구하고 아이디어를 직접 제품으로 만드는 과정을 좋아해요.",
  tags: ["바이브 코딩", "대학생", "Next.js", "AI 페어프로그래밍"],
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/yyeonseoo",
      icon: GithubIcon,
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: InstagramIcon,
    },
    {
      name: "Blog",
      url: "https://velog.io",
      icon: BookOpen,
    },
    {
      name: "Email",
      url: "mailto:ysyoon2013@gmail.com",
      icon: Mail,
    },
  ],
  links: [
    {
      id: "github-repo",
      title: "GitHub 프로젝트 저장소",
      description: "진행 중인 프로젝트 코드를 모아뒀어요",
      url: "https://github.com/yyeonseoo",
      icon: Code2,
      badge: "NEW",
    },
    {
      id: "mylink-repo",
      title: "마이링크 (MyLink)",
      description: "토스 디자인 시스템(TDS)으로 만든 프로필 링크예요",
      url: "https://github.com/yyeonseoo/my-link",
      icon: Sparkles,
      badge: "TDS",
      isBrand: true,
    },
    {
      id: "tech-blog",
      title: "기술 블로그 & 개발 일기",
      description: "배운 지식과 트러블슈팅 경험을 꾸준히 기록해요",
      url: "https://velog.io",
      icon: BookOpen,
    },
    {
      id: "coffee-chat",
      title: "커피챗 & 연락하기",
      description: "협업이나 질문은 언제든지 편하게 보내주세요",
      url: "mailto:ysyoon2013@gmail.com",
      icon: Mail,
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
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      alert("링크 복사에 실패했어요.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F2F4F6] dark:bg-[#121316] flex flex-col items-center justify-start py-6 sm:py-10 px-4 font-sans selection:bg-[#3182F6]/15 selection:text-[#3182F6]">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        {/* TDS TopBar (상단 네비게이션) */}
        <header className="w-full h-14 flex items-center justify-between px-1 mb-2 text-[#191F28] dark:text-[#F9FAFB]">
          <span className="font-bold text-[18px] tracking-tight">마이링크</span>
          <button
            onClick={handleShare}
            aria-label="프로필 링크 공유하기"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#6B7684] dark:text-[#8B95A1] hover:bg-black/5 dark:hover:bg-white/10 active:bg-black/10 dark:active:bg-white/20 transition-all cursor-pointer"
            title="프로필 링크 공유"
          >
            <Share2 className="w-5 h-5 stroke-[1.8]" />
          </button>
        </header>

        {/* 1. 프로필 히어로 카드 (Profile Hero Card) */}
        <div className="w-full bg-white dark:bg-[#1C1C1F] rounded-[28px] p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,29,58,0.04)] dark:shadow-none border border-[#E5E8EB]/70 dark:border-zinc-800/80 mb-3.5 transition-all">
          <div className="flex flex-col items-start text-left">
            {/* 둥근 아바타 & 상태 */}
            <div className="flex items-center gap-3.5 mb-1">
              <div className="w-16 h-16 rounded-full bg-[#E8F3FF] dark:bg-blue-950/40 text-[#3182F6] dark:text-[#60A5FA] flex items-center justify-center text-2xl font-bold select-none">
                윤
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#8B95A1] dark:text-zinc-400">
                  {PROFILE.handle}
                </span>
                <span className="text-[13px] font-medium text-[#4E5968] dark:text-zinc-300 mt-0.5">
                  {PROFILE.status}
                </span>
              </div>
            </div>

            {/* 헤드라인 & 소개글 (TDS 해요체) */}
            <h1 className="mt-5 text-[26px] font-bold text-[#191F28] dark:text-[#F9FAFB] leading-[1.3] tracking-tight whitespace-pre-line">
              {PROFILE.headline}
            </h1>
            <p className="mt-2.5 text-[15px] leading-[1.6] text-[#4E5968] dark:text-zinc-400 whitespace-pre-line">
              {PROFILE.bio}
            </p>

            {/* TDS Full Pill 칩스 (태그 목록) */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {PROFILE.tags.map((tag) => (
                <span
                  key={tag}
                  className="h-[34px] px-3.5 rounded-full text-[13px] font-medium flex items-center bg-[#F2F4F6] dark:bg-zinc-800 text-[#4E5968] dark:text-zinc-300 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 소셜 바로가기 아이콘 바 */}
            <div className="mt-6 pt-5 w-full border-t border-[#F2F4F6] dark:border-zinc-800/80 flex items-center gap-2">
              {PROFILE.socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[#6B7684] dark:text-zinc-400 bg-[#F9FAFB] dark:bg-zinc-800/60 hover:text-[#191F28] dark:hover:text-white hover:bg-[#F2F4F6] dark:hover:bg-zinc-800 active:scale-95 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. 주요 링크 리스트 카드 (TDS ListRow Group) */}
        <div className="w-full bg-white dark:bg-[#1C1C1F] rounded-[28px] shadow-[0_2px_8px_rgba(0,29,58,0.04)] dark:shadow-none border border-[#E5E8EB]/70 dark:border-zinc-800/80 overflow-hidden mb-4">
          <div className="px-6 pt-5 pb-2 text-[14px] font-bold text-[#8B95A1] dark:text-zinc-400">
            주요 링크
          </div>
          <div>
            {PROFILE.links.map((link, index) => {
              const Icon = link.icon;
              return (
                <div key={link.id}>
                  {index > 0 && (
                    <div className="mx-6 border-b border-[#F2F4F6] dark:border-zinc-800/80" />
                  )}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 px-6 py-4 hover:bg-[#F9FAFB] dark:hover:bg-zinc-800/40 active:bg-[#F2F4F6] dark:active:bg-zinc-800/70 transition-colors text-left group"
                  >
                    {/* 44px 좌측 아이콘 슬롯 */}
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                        link.isBrand
                          ? "bg-[#E8F3FF] dark:bg-blue-950/40 text-[#3182F6]"
                          : "bg-[#F2F4F6] dark:bg-zinc-800 text-[#4E5968] dark:text-zinc-300"
                      }`}
                    >
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>

                    {/* 타이틀 및 서브텍스트 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-semibold text-[#191F28] dark:text-[#F9FAFB] truncate">
                          {link.title}
                        </span>
                        {link.badge && (
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                              link.isBrand
                                ? "bg-[#E8F3FF] dark:bg-blue-950/50 text-[#3182F6] dark:text-[#60A5FA]"
                                : "bg-[#F2F4F6] dark:bg-zinc-800 text-[#6B7684] dark:text-zinc-400"
                            }`}
                          >
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] text-[#8B95A1] dark:text-zinc-400 truncate mt-0.5">
                        {link.description}
                      </p>
                    </div>

                    {/* 우측 슬롯 (Chevron Arrow) */}
                    <div className="text-[#B0B8C1] dark:text-zinc-500 group-hover:text-[#6B7684] dark:group-hover:text-zinc-300 transition-colors shrink-0">
                      <ChevronRight className="w-5 h-5 stroke-[2]" />
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Primary CTA (토스 카노니컬 블루 단일 1차 액션 버튼) */}
        <div className="w-full">
          <button
            onClick={handleShare}
            className="w-full h-14 rounded-2xl bg-[#3182F6] hover:bg-[#2272EB] active:bg-[#1B64DA] text-white text-[17px] font-bold transition-all flex items-center justify-center gap-2 shadow-[0_2px_8px_rgba(49,130,246,0.24)] active:scale-[0.99] cursor-pointer"
          >
            <span>프로필 링크 복사하기</span>
          </button>
        </div>

        {/* 푸터 */}
        <footer className="mt-8 pb-6 text-center">
          <p className="text-[13px] font-normal text-[#8B95A1] dark:text-zinc-500">
            © 2026 {PROFILE.name} · 마이링크
          </p>
        </footer>
      </div>

      {/* TDS Toast 알림 (grey-900 표면 + green-500 원형 체크 + 해요체) */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-[14px] bg-[#191F28] text-white text-[15px] font-medium shadow-[0_8px_24px_rgba(0,29,58,0.16)] transition-all duration-200 pointer-events-none ${
          copied
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-3 scale-95"
        }`}
      >
        <div className="w-5 h-5 rounded-full bg-[#059669] flex items-center justify-center shrink-0">
          <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
        </div>
        <span>프로필 링크를 복사했어요</span>
      </div>
    </main>
  );
}
