import { useMemo } from "react";
import { AuthContext } from "./context";
import { useUser } from "@/hooks/use-user";

type Props = { children: React.ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const { data: user, isLoading } = useUser();

  const value = useMemo(
    () => ({
      isLoading,
      user,
    }),
    [isLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
