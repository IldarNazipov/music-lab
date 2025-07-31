import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "../user/log-out";
import { useNavigate } from "react-router";

export const useLogOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["user"] });
      navigate("/login");
    },
  });
};
