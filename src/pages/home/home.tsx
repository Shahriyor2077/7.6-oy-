import { Card } from "@/components/card/card";
import { useGetUserList } from "./service/query/useGetUserList";
import { CardLoading } from "@/components/card/card-loading";
import { BackDrop } from "@/components/back-droup/back-drop";
import { CreateUser } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);

  const { data, isLoading } = useGetUserList(page);
  const buttons = Array(data?.pageSize || 1).fill(null);

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
          {data?.data?.map((item) => (
            <Card key={item.id} {...item} />
          ))}
          <div className="flex justify-center gap-2">
            {buttons.map((_, index) => (
              <Button
                key={index}
                onClick={() => setSearchParams({ page: `${index + 1}` })}
                className={`cursor-pointer hover:bg-blue-400 ${
                  index + 1 === page ? "bg-amber-400" : ""
                }`}
                size={"icon"}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
