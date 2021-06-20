import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
    isFetching,
    error,
  } = useInfiniteQuery(
    "SwApi-species",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );
  if (isLoading) return <div className="loading">Loading......</div>;
  if (isError) return <div>{error.toString()}</div>;
  return (
    <>
      {isLoading && <div className="loading">Loading......</div>}

      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore={fetchNextPage}
      ></InfiniteScroll>
    </>
  );
}
