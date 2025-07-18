import { cn } from "@/lib/сlassnames";

export const LogoutIcon = ({
  className,
  ...props
}: React.ComponentProps<"svg">) => (
  <svg
    width="41"
    height="41"
    viewBox="0 0 41 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(
      "text-white hover:text-[#ACACAC] active:text-[#FFFFFF] transition-colors",
      className,
    )}
    {...props}
  >
    <path
      d="M25.7893 16.1241V14.8201C25.7893 13.3057 24.5617 12.0781 23.0474 12.0781H16.8601C15.3458 12.0781 14.1182 13.3057 14.1182 14.8201V26.1426C14.1182 27.657 15.3458 28.8846 16.8601 28.8846H23.0474C24.5617 28.8846 25.7893 27.657 25.7893 26.1426V24.683M18.4754 20.4035H33.4145M33.4145 20.4035L30.2243 23.5937M33.4145 20.4035L30.2243 17.2134"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="20.1182" cy="20.0781" r="19.5" stroke="currentColor" />
  </svg>
);
