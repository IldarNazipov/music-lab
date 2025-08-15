import { useMemo } from "react";

import { useUser } from "@/api/hooks/use-user";

import { AuthContext } from "./context";

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
