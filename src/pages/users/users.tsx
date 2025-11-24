import { Card } from "@/components/card/card";
import { CardLoading } from "@/components/card/card-loading";
import { Spinner } from "@/components/ui/spinner";
import { useItems } from "@/service/useItems";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import React from "react";

export const Users = () => {
  const { data, fetchNextPage, isLoading, hasNextPage, isFetching } =
    useItems();
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  React.useEffect(() => {
    if (hasNextPage && entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting]);

  return (
    <div className="container">
      {isLoading ? (
        <CardLoading />
      ) : (
        <>
          {data?.pages.map((page) =>
            page.map((item) => <Card key={item.id} {...item} />)
          )}
        </>
      )}
      {isFetching && hasNextPage ? (
        <Spinner className="size-5 text-blue-700" />
      ) : (
        ""
      )}
      <div ref={ref} />
    </div>
  );
};
