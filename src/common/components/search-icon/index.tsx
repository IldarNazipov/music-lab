export const SearchIcon = ({
  width = 16,
  height = 16,
  ...props
}: React.ComponentProps<"svg">) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.92761 10.7749L13.37 15.0645"
      stroke="white"
      strokeLinecap="round"
    />
    <circle
      cx="6.48527"
      cy="6.48526"
      r="5.5"
      transform="rotate(-38.7469 6.48527 6.48526)"
      stroke="white"
    />
  </svg>
);
