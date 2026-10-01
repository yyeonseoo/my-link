"use client";

import { useState } from "react";
import {
  Share2,
  Check,
  ChevronRight,
  Sparkles,
  Code2,
  BookOpen,
  Coffee,
  FileText,
  Globe,
  Mail,
  Flame,
} from "lucide-react";
import { MOCK_USER_PROFILE, type LinkItem } from "@/data/links";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// YouTube 브랜드 SVG
function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
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
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

// GitHub 브랜드 SVG
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

// Instagram 브랜드 SVG
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

// 아이콘 이름 매핑 딕셔너리
const ICON_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Code2,
  BookOpen,
  Coffee,
  Youtube: YoutubeIcon,
  FileText,
  Globe,
};

export default function Home() {
  const [profile] = useState(MOCK_USER_PROFILE);
  const [links, setLinks] = useState<LinkItem[]>(MOCK_USER_PROFILE.links);
  const [copied, setCopied] = useState(false);

  // 공유하기 (클립보드 복사 & Web Share API)
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name} (@${profile.handle}) | 마이링크`,
          text: profile.bio,
          url,
        });
        return;
      } catch {
        // 취소 또는 미지원 시 클립보드 복사로 대체
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

  // 링크 클릭 이벤트 (클릭수 실시간 집계 및 이동)
  const handleLinkClick = (id: string, url: string) => {
    setLinks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, clickCount: item.clickCount + 1 } : item
      )
    );
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // 공개 페이지에는 활성화(isActive === true)된 링크만 정렬 순서대로 노출
  const activeLinks = links
    .filter((link) => link.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-start py-6 sm:py-10 px-4 font-sans selection:bg-primary/15 selection:text-primary">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        {/* TDS TopBar (상단 내비게이션 바) */}
        <header className="w-full h-14 flex items-center justify-between px-1 mb-2 text-foreground">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[18px] tracking-tight">마이링크</span>
            <Badge size="badge" variant="brand">
              TDS
            </Badge>
          </div>
          {/* shadcn Button (공유 버튼) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            aria-label="프로필 링크 공유하기"
            className="text-muted-foreground hover:text-foreground"
          >
            <Share2 className="w-5 h-5 stroke-[1.8]" />
          </Button>
        </header>

        {/* 1. shadcn Card 기반 프로필 히어로 카드 */}
        <Card className="w-full mb-3.5">
          <CardHeader className="p-0">
            {/* 아바타 & 핸들 정보 */}
            <div className="flex items-center gap-3.5 mb-1">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-bold select-none shrink-0 shadow-inner">
                {profile.name.slice(0, 1)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-semibold text-muted-foreground truncate">
                  @{profile.handle}
                </span>
                {profile.status && (
                  <span className="text-[13px] font-medium text-foreground/80 mt-0.5 truncate">
                    {profile.status}
                  </span>
                )}
              </div>
            </div>

            {/* 헤드라인 타이틀 */}
            <CardTitle className="mt-4 whitespace-pre-line">
              {profile.headline || `안녕하세요,\n${profile.name}예요`}
            </CardTitle>

            {/* 소개 설명글 */}
            <CardDescription className="mt-2 whitespace-pre-line">
              {profile.bio}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 mt-5">
            {/* shadcn Badge 기반 TDS Chip 태그 목록 */}
            {profile.tags && profile.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {profile.tags.map((tag) => (
                  <Badge
                    key={tag}
                    size="chip"
                    variant="secondary"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* 소셜 바로가기 아이콘 바 */}
            <div className="pt-4 w-full border-t border-border flex items-center gap-2">
              {profile.socialLinks.map((item) => {
                let SocialIcon: React.ComponentType<{ className?: string }> = Globe;
                if (item.platform === "github") SocialIcon = GithubIcon;
                else if (item.platform === "instagram") SocialIcon = InstagramIcon;
                else if (item.platform === "email") SocialIcon = Mail;
                else if (item.platform === "youtube") SocialIcon = YoutubeIcon;

                return (
                  <Button
                    key={item.platform}
                    variant="secondary"
                    size="icon"
                    onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
                    aria-label={`${item.platform} 바로가기`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <SocialIcon className="w-4 h-4" />
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 2. shadcn Card 기반 링크 목록 그룹 (TDS ListRow) */}
        <Card className="w-full overflow-hidden mb-4 p-0">
          <div className="px-6 pt-5 pb-2.5 flex items-center justify-between text-[13px] font-bold text-muted-foreground tracking-wider">
            <span>주요 링크 ({activeLinks.length})</span>
            <span className="font-normal text-[12px] text-muted-foreground/70">
              클릭 시 새 탭 이동
            </span>
          </div>

          <div className="divide-y divide-border">
            {activeLinks.map((link) => {
              const IconComponent = (link.icon && ICON_COMPONENTS[link.icon]) || Globe;

              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id, link.url)}
                  className="w-full flex items-center gap-3.5 px-6 py-4 hover:bg-secondary/50 active:bg-secondary active:scale-[0.99] transition-all text-left cursor-pointer group"
                >
                  {/* 좌측 44px 아이콘 서피스 */}
                  <div
                    className={`w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                      link.isHighlighted
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <IconComponent className="w-5 h-5 stroke-[1.8]" />
                  </div>

                  {/* 링크 타이틀 & 설명글 & 통계 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] font-semibold text-foreground truncate">
                        {link.title}
                      </span>
                      {link.badge && (
                        <Badge
                          size="badge"
                          variant={link.isHighlighted ? "brand" : "secondary"}
                        >
                          {link.badge}
                        </Badge>
                      )}
                    </div>
                    {link.description && (
                      <p className="text-[13px] text-muted-foreground truncate mt-0.5">
                        {link.description}
                      </p>
                    )}
                    {/* 실시간 클릭수 (TDS tabular-nums 표기) */}
                    <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-muted-foreground/80 tabular-nums">
                      <Flame className="w-3 h-3 text-[#FF6B00]" />
                      <span>{link.clickCount.toLocaleString()}회 클릭</span>
                    </div>
                  </div>

                  {/* 우측 Chevron Arrow */}
                  <div className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors shrink-0">
                    <ChevronRight className="w-5 h-5 stroke-[2]" />
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* 3. shadcn Button (TDS Primary CTA - XL 56px, 16px radius, Toss Blue) */}
        <div className="w-full">
          <Button
            size="xl"
            variant="primary"
            onClick={handleShare}
            className="w-full"
          >
            <span>프로필 링크 복사하기</span>
          </Button>
        </div>

        {/* 푸터 */}
        <footer className="mt-8 pb-6 text-center">
          <p className="text-[13px] font-normal text-muted-foreground">
            © 2026 {profile.name} · 마이링크
          </p>
        </footer>
      </div>

      {/* TDS Toast 피드백 (grey-900 서피스 + green-500 체크) */}
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
