import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * 토스 디자인 시스템 (TDS, design.md) 공식 규격 버튼 컴포넌트
 * - 4단계 스케일: XL (56px/16px), L (48px/14px), M (40px/12px), S (32px/10px)
 * - 햅틱 반응: active:scale-[0.98] duration-120
 * - 비활성화: disabled:opacity-30 (TDS disabled-opacity: 0.30)
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center font-sans whitespace-nowrap transition-all duration-120 outline-none select-none cursor-pointer active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-[oklch(0.522_0.176_257)] shadow-none",
        primary:
          "bg-primary text-primary-foreground hover:bg-[oklch(0.522_0.176_257)] shadow-none",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[oklch(0.913_0.008_247)] dark:hover:bg-zinc-700",
        outline:
          "border border-border bg-card text-foreground hover:bg-secondary",
        ghost:
          "text-primary hover:bg-primary/5 active:bg-primary/10",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xl: "h-14 px-6 text-[17px] font-bold rounded-[16px] gap-2",
        lg: "h-12 px-5 text-[17px] font-bold rounded-[14px] gap-2",
        default: "h-10 px-4 text-[15px] font-semibold rounded-[12px] gap-1.5",
        md: "h-10 px-4 text-[15px] font-semibold rounded-[12px] gap-1.5",
        sm: "h-8 px-3 text-[13px] font-semibold rounded-[10px] gap-1",
        icon: "size-10 rounded-full",
        "icon-sm": "size-8 rounded-full",
        "icon-lg": "size-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
