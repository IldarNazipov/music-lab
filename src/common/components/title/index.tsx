import { cn } from "@/lib/сlassnames";

type TitleProps = {
  children: React.ReactNode;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl";
  color?: "white" | "black" | "gray";
  className?: string;
};

const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-[32px]",
  "4xl": "text-[60px]",
  "5xl": "text-[72px]",
  "6xl": "text-[128px]",
  "7xl": "text-[160px]",
};

const colorClasses = {
  white: "text-white",
  gray: "text-[#4E4E4E]",
  black: "text-black",
};

export const Title = ({
  children,
  tag: Component = "h1",
  size = "2xl",
  color = "white",
  className,
}: TitleProps) => {
  return (
    <Component
      className={cn(sizeClasses[size], colorClasses[color], className)}
    >
      {children}
    </Component>
  );
};
