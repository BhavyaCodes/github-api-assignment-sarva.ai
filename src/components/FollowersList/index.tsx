import { Follower as FollowerType } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC, useState } from "react";
import { Follower } from "./Follower";

const FollowersList: FC<{ username: string }> = ({ username }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const newQuery = useInfiniteQuery<FollowerType[]>({
    queryKey: ["users", "followers-infinite", username],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get(`https://api.github.com/users/${username}/followers`, {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_GITHUB_API_TOKEN,
          },
          params: {
            per_page: 100,
            page: pageNumber,
          },
        })
        .then((res) => res.data),
    getNextPageParam: (prevData) => {
      return !!prevData.length;
    },
    refetchOnWindowFocus: false,
    onSettled: () => {
      setPageNumber((page) => page + 1);
    },
  });

  if (!newQuery.data?.pages) {
    return null;
  }

  return (
    <div className="h-60 overflow-auto">
      {newQuery.data.pages
        .flatMap((data) => data)
        .map((follower) => (
          <Follower key={follower.id} follower={follower} />
        ))}

      {newQuery.hasNextPage && (
        <button onClick={() => newQuery.fetchNextPage()}>next</button>
      )}
    </div>
  );
};

export default FollowersList;
