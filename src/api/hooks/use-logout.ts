import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "../user/log-out";

export const useLogOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["user"] });
    },
  });
};
