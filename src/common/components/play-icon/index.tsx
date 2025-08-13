import { cn } from "@/lib/сlassnames";

export const PlayIcon = ({
  className,
  width,
  height,
  ...props
}: React.ComponentProps<"svg">) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("text-[#D9D9D9] hover:text-[#696969]", className)}
    {...props}
  >
    <path
      d="M15.7437 10L0.743651 0.47372L0.743651 19.5263L15.7437 10Z"
      fill="currentColor"
    />
  </svg>
);
