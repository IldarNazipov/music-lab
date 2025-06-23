import { logOut } from "@/api/user/log-out";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/auth/use-auth";

export const TempPage = () => {
  const { setAuth, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logOut();
    setCurrentUser(null);
    setAuth(false);
    navigate("/login");
  };

  return (
    <div className="flex h-screen items-center justify-center font-roboto">
      <Card className="w-[366px] flex flex-col items-center justify-center px-[44px] pt-7 pb-[38px] gap-0 rounded-[12px]">
        <CardContent className="flex flex-col gap-[30px] p-0 mb-[59px]">
          <h3 className="text-3xl">Успешный вход</h3>
        </CardContent>
        <CardFooter className="flex flex-col w-full">
          <Button
            variant="purple"
            className="h-[52px] mb-3"
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
