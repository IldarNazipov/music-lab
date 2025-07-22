import { createContext } from "react";

type AuthContextType = {
  isLoading: boolean;
  isAuth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
