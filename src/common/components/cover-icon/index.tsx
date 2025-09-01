export const CoverIcon = ({
  width = 52,
  height = 52,
  ...props
}: React.ComponentProps<"svg">) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="100%" height="100%" fill="var(--secondary-foreground)" />
    <path
      d="M23.118 32.828V18.798L34.118 17.828V29.828"
      stroke="var(--muted-foreground)"
    />
    <ellipse
      cx="19.618"
      cy="32.828"
      rx="3.5"
      ry="2"
      stroke="var(--muted-foreground)"
    />
    <ellipse
      cx="30.618"
      cy="29.828"
      rx="3.5"
      ry="2"
      stroke="var(--muted-foreground)"
    />
  </svg>
);
