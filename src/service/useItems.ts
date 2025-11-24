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
        .then((res) => {
          const totalCount = Number(res.headers['x-total-count']);
          const totalPages = Math.ceil(totalCount / 3);
          return { data: res.data, totalPages };
        }),
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      return lastPageParam < lastPage.totalPages ? lastPageParam + 1 : null;
    },
  });
};
