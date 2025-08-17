import { useQuery } from "@tanstack/react-query";

import { getUser } from "@/api/user/get-user";

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });
