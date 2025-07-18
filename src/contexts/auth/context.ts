import type { UserData } from "@/api/user/get-user";
import { createContext } from "react";

type AuthContextType = {
  isLoading: boolean;
  isAuth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  currentUser: UserData | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);
