import { Card } from "@/components/card/card";
import { useGetUserList } from "./service/query/useGetUserList";
import { CardLoading } from "@/components/card/card-loading";
import { BackDrop } from "@/components/back-droup/back-drop";
import { CreateUser } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import React from "react";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const { data, isLoading } = useGetUserList(page);

  const paginatedData = React.useMemo(() => {
    if (!data?.allData) return [];
    const limit = 3;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return data.allData.slice(startIndex, endIndex);
  }, [data?.allData, page]);

  const pageSize = data?.pageSize || 1;
  const buttons = Array(pageSize).fill(null);

  return (
    <div className="container">
      <CreateUser />
      {isLoading ? (
        <>
          <CardLoading />
          <BackDrop />
        </>
      ) : (
        <div>
          {paginatedData.map((item) => (
            <Card key={item.id} {...item} />
          ))}
          <div className="flex justify-center gap-2 my-8">
            {buttons.map((_, index) => (
              <Button
                key={index}
                onClick={() => setSearchParams({ page: `${index + 1}` })}
                className={`cursor-pointer hover:bg-blue-400 ${index + 1 === page ? "bg-amber-400" : ""
                  }`}
                size={"icon"}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <p className="text-center text-gray-500 mb-8">
            Page {page} of {pageSize}
          </p>
        </div>
      )}
    </div>
  );
};
