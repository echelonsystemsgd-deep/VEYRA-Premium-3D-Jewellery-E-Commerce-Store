import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xs text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-veyra-brass disabled:pointer-events-none disabled:opacity-50 tracking-[0.2em] uppercase font-mono select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-veyra-text text-white shadow-xs hover:bg-black transition-all duration-300",
        outline:
          "border border-veyra-border bg-veyra-surface text-veyra-text hover:border-veyra-text hover:bg-veyra-subtle/50 transition-all duration-300",
        secondary:
          "bg-veyra-subtle text-veyra-text hover:bg-veyra-border/60 transition-all duration-300",
        ghost:
          "text-veyra-muted hover:text-veyra-text hover:bg-veyra-subtle/60 transition-all duration-300",
        link:
          "text-veyra-text underline-offset-4 hover:underline",
        metallic:
          "bg-gradient-to-r from-[#967538] to-[#b38728] text-white shadow-xs hover:brightness-105 transition-all duration-300",
      },
      size: {
        default: "h-11 px-6 py-2.5", // 8px grid (44px min touch target, 24px px)
        sm: "h-9 px-4 text-[0.625rem]", // 36px
        lg: "h-14 px-8 text-sm", // 56px
        icon: "h-10 w-10 p-0", // 40px
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
