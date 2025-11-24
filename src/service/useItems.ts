import { request } from "@/config/request";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UserLIst {
  name: string;
  email: string;
  username?: string;
  id: number;
}

export const useItems = () => {
  return useInfiniteQuery({
    queryKey: ["items"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      request
        .get<UserLIst[]>("/users", {
          params: {
            _page: pageParam,
            _limit: 3,
          },
        })
        .then((res) => res.data),
    getNextPageParam: (_lastPage, allPage, lastPageParam) => {
      return lastPageParam < 5 ? allPage.length + 1 : null;
    },
  });
};
