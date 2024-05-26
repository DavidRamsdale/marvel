import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import Card from "./Card";
import { fetchComics } from "../utils/api";

const Comics = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["comics"],
    queryFn: fetchComics,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      console.log("🚀 ~ Comics ~ lastPage:", lastPage);
      const morePagesExist = lastPage.data.offset + 20 < lastPage.data.total;
      return morePagesExist ? lastPage.data.offset + 20 : undefined;
    },
  });
  console.log("🚀 ~ Comics ~ data:", data);

  // Add error handling
  if (error) return <div>An error has occurred</div>;

  return (
    <div className="w-full ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.results.map((comic: any) => {
              const image =
                comic.thumbnail.path + "." + comic.thumbnail.extension;
              return (
                <Card
                  id={comic.id}
                  key={comic.id}
                  title={comic.title}
                  description={comic.description}
                  image={image}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
};

export default Comics;
