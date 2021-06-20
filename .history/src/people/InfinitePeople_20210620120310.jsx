import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "SwApi-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  console.log(data, fetchNextPage, hasNextPage);
  return (
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
      {data.pages.map((data) => {
        return data.results.map((value) => {
          return (
            <Person
              key={value.name}
              name={value.name}
              hairColor={value.hair_color}
              eyeColor={value.eye_color}
            />
          );
        });
      })}
    </InfiniteScroll>
  );
}
