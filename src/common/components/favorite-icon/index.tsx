import { cn } from "@/lib/сlassnames";

export const FavoriteIcon = ({
  className,
  width,
  height,
  isActive,
  ...props
}: React.ComponentProps<"svg"> & { isActive: boolean | undefined }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 15"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(
      "text-[#696969] hover:text-[#ACACAC] active:text-[#FFFFFF] active:fill-[#696969] transition-colors",
      className,
    )}
    {...props}
  >
    <path
      d="M8.46213 3.21275H8.4837C9.41559 2.39879 11.8747 1.1228 14.0749 2.72437C17.4295 5.16624 14.3642 10.457 8.4837 13.957H8.46213M8.46219 3.21275H8.44062C7.50873 2.39879 5.04961 1.1228 2.84942 2.72437C-0.505144 5.16624 2.56013 10.457 8.44062 13.957H8.46219"
      stroke="currentColor"
    />
    {isActive && (
      <path
        d="M0 1L15 13"
        stroke="currentColor"
        className="transition-opacity duration-200"
      />
    )}
  </svg>
);
