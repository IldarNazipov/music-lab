import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = ({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) => (
  <input
    type={type}
    data-slot="input"
    className={cn(
      "placeholder:text-[#D0CECE] placeholder:text-lg selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-[40px] w-full min-w-0 border-b bg-transparent transition-[color,box-shadow] outline-none focus:border-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      className,
    )}
    {...props}
  />
);
