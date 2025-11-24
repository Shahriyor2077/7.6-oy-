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
    queryKey: ["user_list"],
    queryFn: () =>
      request
        .get<UserLIst[]>("/users")
        .then((res): { data: UserLIst[]; pageSize: number; allData: UserLIst[] } => {
          const allData = res.data;
          const totalCount = allData.length;
          const pageSize = Math.ceil(totalCount / limit);

          // Frontend pagination
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedData = allData.slice(startIndex, endIndex);

          return { data: paginatedData, pageSize, allData };
        }),
  });
};
