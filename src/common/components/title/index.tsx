import { cn } from "@/lib/сlassnames";

type TitleProps = {
  children: React.ReactNode;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "7xl";
  color?: "white" | "black" | "gray";
  className?: string;
};

const sizeClasses = {
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-[32px]",
  "4xl": "text-[60px]",
  "7xl": "text-[160px]",
};

export const Title = ({
  children,
  tag: Component = "h1",
  size = "2xl",
  className,
}: TitleProps) => {
  return (
    <Component className={cn(sizeClasses[size], className)}>
      {children}
    </Component>
  );
};
