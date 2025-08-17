import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/сlassnames";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center w-auto gap-2 whitespace-nowrap rounded-[6px] text-lg transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        outline:
          "bg-white text-black hover:bg-[#F4F5F6] active:bg-[#D9D9D9] border border-[#D0CECE]",
        purple:
          "bg-[#580EA2] text-white hover:bg-[#3F007D] active:bg-[#271A58]",
      },
      size: {
        default: "h-[52px] px-[45px] py-[14px] has-[>svg]:px-3",
        sm: "rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const Button = ({
  className,
  variant,
  size,
  fullWidth = false,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    fullWidth?: boolean;
  }) => {
  const Comp = asChild ? Slot : "button";

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }), widthClass)}
      {...props}
    />
  );
};
