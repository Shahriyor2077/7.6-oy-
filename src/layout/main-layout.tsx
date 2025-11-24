import { Input } from "@/components/ui/input";
import { useSearch } from "@/service/useSearch";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import { Spinner } from "@/components/ui/spinner";

export const MainLayout = () => {
  const [input, setInput] = React.useState("");

  const value = useDebounce(input, 500);

  const { data, isLoading } = useSearch(value);

  const location = useLocation();

  React.useEffect(() => {
    setInput("");
  }, [location.pathname]);

  return (
    <>
      <header className="p-5 bg-amber-400">
        <div className="container flex justify-end gap-[30px] items-center">
          <Link to={"/users"}>Users</Link>
          <div className="w-[400px] relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value.trim())}
              placeholder="Search"
              className="bg-white"
            />
            {input ? (
              <div className="absolute bg-white rounded-2xl w-full p-2.5 shadow top-10">
                {isLoading ? (
                  <Spinner />
                ) : (
                  <>
                    {data?.length ? (
                      data.map((item) => (
                        <div key={item.id} className="my-2">
                          <h2 className="text-2xl">
                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                          </h2>
                        </div>
                      ))
                    ) : (
                      <h2 className="text-3xl">Not Found</h2>
                    )}
                  </>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};
