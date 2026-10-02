"use client";

import { useState } from "react";
import {
  Sparkles,
  Code2,
  BookOpen,
  Coffee,
  FileText,
  Globe,
  Mail,
  ShoppingBag,
  Video,
  Check,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { LinkItem } from "@/data/links";

// 아이콘 프리셋 목록
export const AVAILABLE_ICONS = [
  { id: "Sparkles", label: "반짝임", Icon: Sparkles },
  { id: "Globe", label: "웹사이트", Icon: Globe },
  { id: "Code2", label: "개발/코드", Icon: Code2 },
  { id: "BookOpen", label: "블로그", Icon: BookOpen },
  { id: "Coffee", label: "커피챗", Icon: Coffee },
  { id: "ShoppingBag", label: "마켓/쇼핑", Icon: ShoppingBag },
  { id: "Video", label: "영상/유튜브", Icon: Video },
  { id: "FileText", label: "문서/신청", Icon: FileText },
  { id: "Mail", label: "이메일", Icon: Mail },
];

// 뱃지 프리셋 목록
export const BADGE_PRESETS = ["NEW", "HOT", "추천", "TDS", "공식", "이벤트"];

export interface AddLinkFormData {
  title: string;
  description: string;
  url: string;
  icon: string;
  badge: string;
  isHighlighted: boolean;
  isActive: boolean;
}

interface AddLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLink: (data: Omit<LinkItem, "id" | "order" | "clickCount" | "createdAt">) => void;
}

export function AddLinkDialog({ open, onOpenChange, onAddLink }: AddLinkDialogProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string>("Sparkles");
  const [selectedBadge, setSelectedBadge] = useState<string>("");
  const [customBadge, setCustomBadge] = useState<string>("");
  const [isHighlighted, setIsHighlighted] = useState(false);

  // 에러 상태
  const [errors, setErrors] = useState<{ title?: string; url?: string }>({});

  const resetForm = () => {
    setTitle("");
    setUrl("");
    setDescription("");
    setSelectedIcon("Sparkles");
    setSelectedBadge("");
    setCustomBadge("");
    setIsHighlighted(false);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const validate = () => {
    const nextErrors: { title?: string; url?: string } = {};

    if (!title.trim()) {
      nextErrors.title = "링크 제목을 입력해 주세요.";
    }

    if (!url.trim()) {
      nextErrors.url = "연결할 주소(URL)를 입력해 주세요.";
    } else {
      // URL 유효성 검사 (http:// 또는 https:// 로 시작하는지, 혹은 일반적인 도메인 형태인지)
      const trimmedUrl = url.trim();
      const urlPattern = /^(https?:\/\/)?([\w.-]+)+([:\d]+)?(\/.*)?$/i;
      if (!urlPattern.test(trimmedUrl)) {
        nextErrors.url = "올바른 URL 형식(예: https://example.com)을 입력해 주세요.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    let finalUrl = url.trim();
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }

    const finalBadge = (customBadge.trim() || selectedBadge).trim() || undefined;

    onAddLink({
      title: title.trim(),
      description: description.trim() || undefined,
      url: finalUrl,
      icon: selectedIcon,
      badge: finalBadge,
      isHighlighted,
      isActive: true,
    });

    handleClose();
  };

  const toggleBadge = (badge: string) => {
    if (selectedBadge === badge) {
      setSelectedBadge("");
    } else {
      setSelectedBadge(badge);
      setCustomBadge("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[480px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <DialogTitle>새 링크 추가하기</DialogTitle>
          </div>
          <DialogDescription>
            방문자에게 보여줄 새로운 링크 정보를 입력해 주세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-1">
          {/* 1. 링크 제목 (필수) */}
          <div className="space-y-1.5 text-left">
            <label className="text-[13px] font-semibold text-foreground flex items-center justify-between">
              <span>링크 제목 <span className="text-primary">*</span></span>
              <span className="text-[12px] font-normal text-muted-foreground">
                {title.length}/30
              </span>
            </label>
            <Input
              value={title}
              maxLength={30}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              placeholder="예: 최신 유튜브 영상, 노션 포트폴리오"
              hasError={Boolean(errors.title)}
              autoFocus
            />
            {errors.title && (
              <p className="text-[12px] font-medium text-destructive mt-1">
                {errors.title}
              </p>
            )}
          </div>

          {/* 2. 목적지 URL (필수) */}
          <div className="space-y-1.5 text-left">
            <label className="text-[13px] font-semibold text-foreground">
              연결할 주소 (URL) <span className="text-primary">*</span>
            </label>
            <Input
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (errors.url) setErrors((prev) => ({ ...prev, url: undefined }));
              }}
              placeholder="https://example.com"
              hasError={Boolean(errors.url)}
            />
            {errors.url ? (
              <p className="text-[12px] font-medium text-destructive mt-1">
                {errors.url}
              </p>
            ) : (
              <p className="text-[11px] text-muted-foreground/80">
                https://를 생략해도 자동으로 연결돼요.
              </p>
            )}
          </div>

          {/* 3. 설명 (선택) */}
          <div className="space-y-1.5 text-left">
            <label className="text-[13px] font-semibold text-foreground flex items-center justify-between">
              <span>설명 (선택)</span>
              <span className="text-[12px] font-normal text-muted-foreground">
                {description.length}/50
              </span>
            </label>
            <Input
              value={description}
              maxLength={50}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="링크에 대해 짧게 소개해 주세요"
            />
          </div>

          {/* 4. 대표 아이콘 선택 */}
          <div className="space-y-2 text-left">
            <label className="text-[13px] font-semibold text-foreground">
              대표 아이콘
            </label>
            <div className="grid grid-cols-4 gap-2">
              {AVAILABLE_ICONS.map((item) => {
                const IconComponent = item.Icon;
                const isSelected = selectedIcon === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedIcon(item.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-[12px] border transition-all text-center cursor-pointer active:scale-[0.96] ${
                      isSelected
                        ? "bg-accent border-primary text-primary font-semibold shadow-xs"
                        : "bg-secondary border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mb-1" />
                    <span className="text-[11px] truncate w-full">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. 뱃지 프리셋 및 커스텀 (선택) */}
          <div className="space-y-2 text-left">
            <label className="text-[13px] font-semibold text-foreground">
              뱃지 (선택)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {BADGE_PRESETS.map((badge) => {
                const isSelected = selectedBadge === badge;
                return (
                  <button
                    key={badge}
                    type="button"
                    onClick={() => toggleBadge(badge)}
                    className="cursor-pointer"
                  >
                    <Badge
                      size="chip"
                      variant={isSelected ? "brand" : "secondary"}
                      className={
                        isSelected
                          ? "border border-primary font-bold shadow-xs"
                          : "hover:bg-secondary/80"
                      }
                    >
                      {badge}
                    </Badge>
                  </button>
                );
              })}
            </div>
            <Input
              value={customBadge}
              maxLength={10}
              onChange={(e) => {
                setCustomBadge(e.target.value);
                if (e.target.value) setSelectedBadge("");
              }}
              placeholder="직접 뱃지 문구 입력 (최대 10자)"
              className="h-10 text-[13px]"
            />
          </div>

          {/* 6. 대표 링크 강조 옵션 */}
          <div className="pt-2 border-t border-border">
            <label className="flex items-center justify-between p-3 rounded-[12px] bg-secondary/60 hover:bg-secondary cursor-pointer transition-colors">
              <div className="flex flex-col text-left">
                <span className="text-[14px] font-semibold text-foreground">
                  대표 링크로 강조하기
                </span>
                <span className="text-[12px] text-muted-foreground">
                  블루 컬러 틴트 배경으로 방문자의 시선을 끌어요
                </span>
              </div>
              <input
                type="checkbox"
                checked={isHighlighted}
                onChange={(e) => setIsHighlighted(e.target.checked)}
                className="w-5 h-5 accent-primary rounded cursor-pointer"
              />
            </label>
          </div>

          {/* 다이얼로그 푸터 버튼 */}
          <DialogFooter className="pt-3">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={handleClose}
              className="w-full sm:w-auto"
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Check className="w-4 h-4 mr-1" />
              <span>링크 추가하기</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
