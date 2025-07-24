import type { UserData } from "@/api/user/get-user";
import { createContext } from "react";

type AuthContextType = {
  isLoading: boolean;
  user?: UserData;
};

export const AuthContext = createContext<AuthContextType | null>(null);
