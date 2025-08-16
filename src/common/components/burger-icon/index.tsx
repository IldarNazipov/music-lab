export const BurgerIcon = ({
  width = 20,
  height = 15,
  ...props
}: React.ComponentProps<"svg">) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect y="0" width="20" height="1" fill="#D3D3D3" />
    <rect y="6.5" width="20" height="1" fill="#D3D3D3" />
    <rect y="13" width="20" height="1" fill="#D3D3D3" />
  </svg>
);
