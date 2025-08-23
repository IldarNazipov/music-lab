export const DurationIcon = ({
  width = 12,
  height = 13,
  ...props
}: React.ComponentProps<"svg">) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="6" cy="6.24121" r="5.5" stroke="var(--muted-foreground)" />
    <path d="M4 6.24121H6.5V2.74121" stroke="var(--muted-foreground)" />
  </svg>
);
