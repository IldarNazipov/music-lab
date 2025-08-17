import { Navigate, Outlet } from "react-router";

import { Spinner } from "@/common/components/spinner";
import { useAuth } from "@/contexts/auth/use-auth";

export const PublicRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner className="flex h-screen items-center justify-center" />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
