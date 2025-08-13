export const VolumeIcon = ({
  width,
  height,
  ...props
}: React.ComponentProps<"svg">) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 15 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask id="path-1-inside-1_1_1480" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.74365 0L3.74365 5H0.743652V13H3.74365L8.74365 18V0Z"
      />
    </mask>
    <path
      d="M3.74365 5V6H4.15787L4.45076 5.70711L3.74365 5ZM8.74365 0H9.74365V-2.41421L8.03655 -0.707107L8.74365 0ZM0.743652 5V4H-0.256348V5H0.743652ZM0.743652 13H-0.256348V14H0.743652V13ZM3.74365 13L4.45076 12.2929L4.15787 12H3.74365V13ZM8.74365 18L8.03655 18.7071L9.74365 20.4142V18H8.74365ZM4.45076 5.70711L9.45076 0.707107L8.03655 -0.707107L3.03655 4.29289L4.45076 5.70711ZM0.743652 6H3.74365V4H0.743652V6ZM1.74365 13V5H-0.256348V13H1.74365ZM3.74365 12H0.743652V14H3.74365V12ZM9.45076 17.2929L4.45076 12.2929L3.03655 13.7071L8.03655 18.7071L9.45076 17.2929ZM7.74365 0V18H9.74365V0H7.74365Z"
      fill="white"
      mask="url(#path-1-inside-1_1_1480)"
    />
    <path
      d="M11.7437 13C12.8482 13 13.7437 11.2091 13.7437 9C13.7437 6.79086 12.8482 5 11.7437 5"
      stroke="white"
    />
  </svg>
);
