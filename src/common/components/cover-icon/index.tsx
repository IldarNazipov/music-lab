export const CoverIcon = ({
  width,
  height,
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
    <rect x="0.118164" y="0.828125" width="51" height="51" fill="#313131" />
    <path
      d="M23.1182 32.8281V18.7978L34.1182 17.8281V29.8281"
      stroke="#4E4E4E"
    />
    <ellipse cx="19.6182" cy="32.8281" rx="3.5" ry="2" stroke="#4E4E4E" />
    <ellipse cx="30.6182" cy="29.8281" rx="3.5" ry="2" stroke="#4E4E4E" />
  </svg>
);
