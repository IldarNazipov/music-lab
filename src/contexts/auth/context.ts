import type { UserData } from "@/api/user/get-user";
import { createContext } from "react";

type AuthContextType = {
  isLoading: boolean;
  isAuth: boolean;
  setAuth: (isAuth: boolean) => void;
  setCurrentUser: (user: UserData | null) => void;
  currentUser: UserData | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);
