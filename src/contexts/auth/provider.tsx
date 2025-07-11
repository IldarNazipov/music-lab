import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./context";
import { getUser, type UserData } from "@/api/user/get-user";

type Props = { children: React.ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const [isAuth, setAuth] = useState(false);
  const [, setCurrentUser] = useState<UserData | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getUser();
        setCurrentUser(response);
        setAuth(true);
      } catch {
        setCurrentUser(null);
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      isAuth,
      setAuth,
    }),
    [isLoading, isAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
