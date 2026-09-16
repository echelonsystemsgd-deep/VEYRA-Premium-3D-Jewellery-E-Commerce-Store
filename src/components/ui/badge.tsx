import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-xs border px-2.5 py-0.5 text-[0.625rem] font-mono font-medium tracking-[0.2em] uppercase transition-colors focus:outline-none focus:ring-1 focus:ring-veyra-brass",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-veyra-text text-white shadow-xs",
        secondary:
          "border-transparent bg-veyra-subtle text-veyra-text",
        outline:
          "border-veyra-border text-veyra-muted bg-veyra-surface",
        hallmark:
          "border-veyra-border bg-veyra-surface text-veyra-brass shadow-2xs",
        garnet:
          "border-transparent bg-veyra-garnet text-white",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
