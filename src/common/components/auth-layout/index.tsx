import { Card, CardHeader } from "@/common/components/card";
import { Logo } from "@/common/components/logo";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="w-[366px] flex flex-col px-[44px] pt-7 pb-[38px] gap-0 rounded-[12px]">
      <CardHeader className="flex justify-center mb-[20px]">
        <Logo />
      </CardHeader>
      {children}
    </Card>
  );
};
