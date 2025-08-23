import { cn } from "@/lib/сlassnames";

export const PrevIcon = ({
  className,
  width = 16,
  height = 14,
  ...props
}: React.ComponentProps<"svg">) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(
      "text-[#D9D9D9] hover:text-muted active:text-[#D9D9D9]",
      className,
    )}
    {...props}
  >
    <path d="M0.743652 2V12.5" stroke="currentColor" />
    <path
      d="M2.74365 7L12.4937 0.937823L12.4937 13.0622L2.74365 7Z"
      fill="currentColor"
    />
  </svg>
);
