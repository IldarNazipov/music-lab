import * as React from "react";

import { cn } from "@/lib/сlassnames";

export const Input = ({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) => (
  <input
    type={type}
    data-slot="input"
    className={cn(
      "placeholder:text-primary placeholder:text-lg flex h-[40px] w-full min-w-0 border-b border-[#D0CECE] bg-transparent transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      className,
    )}
    {...props}
  />
);
