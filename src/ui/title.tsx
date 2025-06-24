import { cn } from "@/lib/utils";

type TitleProps = {
  children: React.ReactNode;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number;
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
  ...props
}: TitleProps) => {
  const resolvedSize =
    typeof size === "number" ? `text-[${size}px]` : sizeClasses[size];

  return (
    <Component
      className={cn(resolvedSize, colorClasses[color], className)}
      {...props}
    >
      {children}
    </Component>
  );
};
