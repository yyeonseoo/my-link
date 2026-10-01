import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * 토스 디자인 시스템 (TDS, design.md) 공식 규격 뱃지 & 칩 컴포넌트
 * - badge: 22px 높이, 6px radius, 11px Bold, 파스텔 washed 배경
 * - chip: 34px 높이, 999px Full-Pill, 13px Medium
 */
const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center font-sans whitespace-nowrap transition-colors select-none [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-foreground",
        brand: "bg-accent text-accent-foreground",
        secondary: "bg-secondary text-muted-foreground",
        active: "bg-foreground text-background",
        destructive: "bg-destructive/10 text-destructive",
        outline: "border border-border bg-card text-foreground",
      },
      size: {
        default: "h-[22px] px-2 text-[11px] font-bold rounded-[6px] gap-1",
        badge: "h-[22px] px-2 text-[11px] font-bold rounded-[6px] gap-1",
        chip: "h-[34px] px-3.5 text-[13px] font-medium rounded-full gap-1.5",
        sm: "h-5 px-1.5 text-[10px] font-semibold rounded-[4px] gap-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      size,
    },
  })
}

export { Badge, badgeVariants }
