import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC, useState } from "react";
import { RepositoryCard } from "./RepositoryCard";
import { Repository } from "@/types";

const RepositoryList: FC<{ username: string }> = ({ username }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const inifiniteRepositoryQuery = useInfiniteQuery<Repository[]>({
    queryKey: ["users", "repositories-infinite", username],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get(`https://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_GITHUB_API_TOKEN,
          },
          params: {
            page: pageNumber,
            per_page: 100,
            sort: "created",
            direction: "desc",
          },
        })
        .then((res) => res.data),
    getNextPageParam: (prevData) => {
      return !!prevData.length;
    },
    retry: false,
    refetchOnWindowFocus: false,

    onSettled: () => {
      setPageNumber((page) => page + 1);
    },
  });

  if (!inifiniteRepositoryQuery.data) {
    return null;
  }

  const flatData = inifiniteRepositoryQuery.data.pages.flatMap((data) => data);

  return (
    <div className="h-60 overflow-auto">
      {flatData.map((repo) => (
        <RepositoryCard key={repo.id} {...repo} />
      ))}
      {flatData.length === 0 && <p>User has no public repostories 🥲</p>}

      {inifiniteRepositoryQuery.hasNextPage && (
        <button
          className="btn btn-xs btn-outline btn-secondary w-24 mb-2"
          onClick={() => inifiniteRepositoryQuery.fetchNextPage()}
        >
          {inifiniteRepositoryQuery.isFetching ? (
            <span className="loading loading-infinity loading-xs"></span>
          ) : (
            "Fetch more"
          )}
        </button>
      )}
    </div>
  );
};

export default RepositoryList;
