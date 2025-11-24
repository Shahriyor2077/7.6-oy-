import { useQuery } from "@tanstack/react-query";
import { request } from "@/config/request";

interface UserLIst {
  name: string;
  email: string;
  username?: string;
  id: number;
}

export const useSearch = (str: string = "") => {
  return useQuery({
    queryKey: ["search_item", str],
    queryFn: () =>
      request
        .get<UserLIst[]>("/users", {
          params: {
            name_like: str,
          },
        })
        .then((res) => res.data),
  });
};
