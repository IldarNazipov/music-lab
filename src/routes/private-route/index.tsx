import { useAuth } from "@/contexts/auth/use-auth";
import { Spinner } from "@/ui/spinner";
import { Navigate } from "react-router";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
