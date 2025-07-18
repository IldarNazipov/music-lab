export const Logo = ({
  width,
  height,
  ...props
}: React.ComponentProps<"img">) => (
  <img
    src="src/assets/images/logo.svg"
    alt="Logo"
    width={`${width}px`}
    height={`${height}px`}
    {...props}
  />
);
