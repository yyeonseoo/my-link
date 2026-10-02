import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

/**
 * 토스 디자인 시스템 (TDS, design.md) 공식 규격 인풋 컴포넌트
 * - 48px height, 12px radius (radius-m)
 * - resting: grey-100 배경, 1px grey-200 보더
 * - focus: white 배경, 1.5px Toss Blue (blue-500) 보더
 * - error: 1.5px red-500 보더
 */
interface InputProps extends React.ComponentProps<"input"> {
  hasError?: boolean
}

function Input({ className, type, hasError, ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-[12px] border bg-secondary px-3.5 text-[15px] text-foreground placeholder:text-muted-foreground transition-all outline-none",
        "border-border focus:bg-white focus:border-primary focus:border-[1.5px]",
        hasError && "border-destructive focus:border-destructive border-[1.5px]",
        "disabled:opacity-30 disabled:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

export { Input }

