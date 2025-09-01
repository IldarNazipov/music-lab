import { cn } from "@/lib/сlassnames";

export const PauseIcon = ({
  className,
  width = 15,
  height = 19,
  ...props
}: React.ComponentProps<"svg">) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 15 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("text-[#D9D9D9] hover:text-muted", className)}
    {...props}
  >
    <rect width="5" height="19" fill="currentColor" />
    <rect x="10" width="5" height="19" fill="currentColor" />
  </svg>
);
