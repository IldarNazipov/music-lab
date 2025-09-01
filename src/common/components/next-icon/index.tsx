import { cn } from "@/lib/сlassnames";

export const NextIcon = ({
  className,
  width = 17,
  height = 14,
  ...props
}: React.ComponentProps<"svg">) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 17 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(
      "text-[#D9D9D9] hover:text-muted active:text-[#D9D9D9]",
      className,
    )}
    {...props}
  >
    <path d="M15.7437 2V12.5" stroke="currentColor" />
    <path
      d="M13.7437 7L3.99365 0.937823L3.99365 13.0622L13.7437 7Z"
      fill="currentColor"
    />
  </svg>
);
