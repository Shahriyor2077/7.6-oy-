import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";

interface UserLIst {
  name: string;
  email: string;
  username?: string;
  id: number;
}

export const useGetUserList = (page: number = 1, limit: number = 3) => {
  return useQuery({
    queryKey: ["user_list", page],
    queryFn: () =>
      request
        .get<UserLIst[]>("/users", {
          params: {
            _limit: limit,
            _page: page,
          },
        })
        .then((res): { data: UserLIst[]; pageSize: number } => {
          //@ts-ignore
          let allItems = res.headers.get("X-Total-count");
          const pageSize = Math.ceil(Number(allItems) / limit);

          return { data: res.data, pageSize };
        }),
  });
};
