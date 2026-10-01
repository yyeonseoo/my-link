export interface SocialLink {
  platform: "instagram" | "youtube" | "github" | "twitter" | "tiktok" | "email" | "other";
  url: string;
}

export interface LinkItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon?: string;
  badge?: string;
  isActive: boolean;
  order: number;
  clickCount: number;
  isHighlighted?: boolean;
  createdAt: string;
}

export interface UserProfile {
  handle: string;
  name: string;
  status?: string;
  headline?: string;
  bio: string;
  avatarUrl: string;
  tags?: string[];
  themeId: "toss-classic" | "toss-dark" | "soft-blue" | "mono-minimal" | "warm-sunset";
  socialLinks: SocialLink[];
  links: LinkItem[];
  totalViews?: number;
  updatedAt: string;
}

/**
 * 토스 디자인 시스템(TDS) 및 PRD 명세 기반 링크 목록 더미 데이터
 * - 토스 특유의 해요체(-요) 보이스앤톤 적용
 * - 클릭 카운트, 뱃지, 아이콘, 활성/비활성 상태 포함
 */
export const MOCK_LINKS: LinkItem[] = [
  {
    id: "link-1",
    title: "마이링크 (MyLink) 프로젝트",
    description: "토스 디자인 시스템(TDS)으로 직접 만든 프로필 링크 서비스예요",
    url: "https://github.com/yyeonseoo/my-link",
    icon: "Sparkles",
    badge: "TDS",
    isActive: true,
    order: 0,
    clickCount: 342,
    isHighlighted: true,
    createdAt: "2026-09-25T10:00:00Z",
  },
  {
    id: "link-2",
    title: "GitHub 코드 저장소",
    description: "지금까지 개발한 오픈소스와 사이드 프로젝트 코드를 모아뒀어요",
    url: "https://github.com/yyeonseoo",
    icon: "Code2",
    badge: "NEW",
    isActive: true,
    order: 1,
    clickCount: 218,
    isHighlighted: false,
    createdAt: "2026-09-26T14:30:00Z",
  },
  {
    id: "link-3",
    title: "기술 블로그 & 개발 일기",
    description: "새롭게 배운 기술과 실무 트러블슈팅 경험을 솔직하게 기록해요",
    url: "https://velog.io",
    icon: "BookOpen",
    badge: "HOT",
    isActive: true,
    order: 2,
    clickCount: 154,
    isHighlighted: false,
    createdAt: "2026-09-27T09:15:00Z",
  },
  {
    id: "link-4",
    title: "커피챗 & 1:1 네트워킹 신청",
    description: "프로젝트 협업 제안이나 질문은 언제든지 편하게 신청해 주세요",
    url: "https://open.kakao.com",
    icon: "Coffee",
    badge: "추천",
    isActive: true,
    order: 3,
    clickCount: 89,
    isHighlighted: false,
    createdAt: "2026-09-28T18:00:00Z",
  },
  {
    id: "link-5",
    title: "최신 유튜브 영상 보러가기",
    description: "‘Next.js 16과 Tailwind v4로 10분 만에 웹앱 만들기’ 영상을 확인해 보세요",
    url: "https://youtube.com",
    icon: "Youtube",
    isActive: true,
    order: 4,
    clickCount: 76,
    isHighlighted: false,
    createdAt: "2026-09-29T12:00:00Z",
  },
  {
    id: "link-6",
    title: "지난 설문조사 및 굿즈 신청 (마감)",
    description: "2026 상반기 커뮤니티 굿즈 신청 폼이에요",
    url: "https://forms.google.com",
    icon: "FileText",
    isActive: false, // 비활성화 테스트용
    order: 5,
    clickCount: 23,
    isHighlighted: false,
    createdAt: "2026-09-20T08:00:00Z",
  },
];

/**
 * 기본 프로필 전체 더미 데이터
 */
export const MOCK_USER_PROFILE: UserProfile = {
  handle: "yeonseo",
  name: "윤연서",
  status: "🌱 지금 바이브 코딩 공부 중이에요",
  headline: "안녕하세요,\n윤연서예요",
  bio: "바이브 코딩을 배우고 있어요. 새로운 기술을 탐구하고 아이디어를 직접 제품으로 만드는 과정을 좋아해요.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
  tags: ["바이브 코딩", "Next.js", "shadcn/ui", "TDS"],
  themeId: "toss-classic",
  totalViews: 1240,
  updatedAt: "2026-10-01T20:30:00Z",
  socialLinks: [
    {
      platform: "github",
      url: "https://github.com/yyeonseoo",
    },
    {
      platform: "instagram",
      url: "https://instagram.com",
    },
    {
      platform: "email",
      url: "mailto:ysyoon2013@gmail.com",
    },
    {
      platform: "youtube",
      url: "https://youtube.com",
    },
  ],
  links: MOCK_LINKS,
};
