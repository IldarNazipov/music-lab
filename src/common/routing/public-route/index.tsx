import { useAuth } from "@/contexts/auth/use-auth";
import { Spinner } from "@/common/components/spinner";
import { Navigate, Outlet } from "react-router";

export const PublicRoute = () => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner className="flex h-screen items-center justify-center" />;
  }

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
