import { useAuth } from "@/contexts/auth/use-auth";
import { Spinner } from "../ui/spinner";
import { Navigate, Outlet } from "react-router";

export const PublicRoute = () => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};
