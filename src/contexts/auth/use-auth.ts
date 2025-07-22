import { useContext } from "react";

import { AuthContext } from "./context";

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("[useAuth] Hook should be used inside Provider");
  }

  return auth;
};
