import type { UserData } from "@/api/user/get-user";
import { createContext } from "react";

type AuthContextType = {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isAuth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: UserData | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserData | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
