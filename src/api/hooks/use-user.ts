import { getUser } from "@/api/user/get-user";
import { useQuery } from "@tanstack/react-query";

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });
