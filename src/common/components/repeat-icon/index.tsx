import { cn } from "@/lib/сlassnames";

export const RepeatIcon = ({
  className,
  width = 20,
  height = 18,
  ...props
}: React.ComponentProps<"svg">) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(
      "text-muted-foreground hover:text-muted active:text-[#D9D9D9]",
      className,
    )}
    {...props}
  >
    <path
      d="M9.74365 3L4.74365 0.113249V5.88675L9.74365 3ZM6.74365 14.5C3.70609 14.5 1.24365 12.0376 1.24365 9H0.243652C0.243652 12.5899 3.1538 15.5 6.74365 15.5V14.5ZM1.24365 9C1.24365 5.96243 3.70609 3.5 6.74365 3.5V2.5C3.1538 2.5 0.243652 5.41015 0.243652 9H1.24365Z"
      fill="currentColor"
    />
    <path
      d="M9.74365 15L14.7437 17.8868V12.1132L9.74365 15ZM12.7437 3.5C15.7812 3.5 18.2437 5.96243 18.2437 9H19.2437C19.2437 5.41015 16.3335 2.5 12.7437 2.5V3.5ZM18.2437 9C18.2437 12.0376 15.7812 14.5 12.7437 14.5V15.5C16.3335 15.5 19.2437 12.5899 19.2437 9H18.2437Z"
      fill="currentColor"
    />
  </svg>
);
