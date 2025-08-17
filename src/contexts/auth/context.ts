import { createContext } from "react";

import type { UserData } from "@/api/user/get-user";

type AuthContextType = {
  isLoading: boolean;
  user?: UserData;
};

export const AuthContext = createContext<AuthContextType | null>(null);
