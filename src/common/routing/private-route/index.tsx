import { useAuth } from "@/contexts/auth/use-auth";
import { Spinner } from "@/common/components/spinner";
import { Navigate } from "react-router";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner className="flex h-screen items-center justify-center" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
