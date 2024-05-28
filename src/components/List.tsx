import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import Card from "./Card";
import { fetchComics } from "../utils/api";

interface ComicsProps {
  handleComicSelection: (id: string) => void;
}

const Comics = ({ handleComicSelection }: ComicsProps) => {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comics"],
      queryFn: fetchComics,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const morePagesExist =
          lastPage.data.offset + lastPage.data.count < lastPage.data.total;
        return morePagesExist
          ? lastPage.data.offset + lastPage.data.count
          : undefined;
      },
    });

  // Add error handling
  if (error) return <div>An error has occurred</div>;

  return (
    <div className="w-full ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.results.map((comic: any) => {
              const image =
                comic.thumbnail.path + "." + comic.thumbnail.extension;
              return (
                <Card
                  handleComicSelection={() => handleComicSelection(comic.id)}
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
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
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
