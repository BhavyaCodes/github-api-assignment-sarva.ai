import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC, useState } from "react";
import { RepositoryCard } from "./RepositoryCard";
import { Repository } from "@/types";

const RepositoryList: FC<{ username: string }> = ({ username }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const inifiniteRepositoryQuery = useInfiniteQuery<Repository[]>({
    queryKey: ["users", "repositories-infinite", username],
    // enabled: !!data?.login,
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get(`https://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_GITHUB_API_TOKEN,
          },
          params: {
            page: pageNumber,
            per_page: 5,
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

  // console.log(first);
  if (!inifiniteRepositoryQuery.data) {
    return null;
  }

  return (
    <div className="h-60 overflow-auto">
      {inifiniteRepositoryQuery.data.pages
        .flatMap((data) => data)
        .map((repo) => (
          <RepositoryCard key={repo.id} {...repo} />
        ))}

      {inifiniteRepositoryQuery.hasNextPage && (
        <button onClick={() => inifiniteRepositoryQuery.fetchNextPage()}>
          Fetch More
        </button>
      )}
    </div>
  );
};

export default RepositoryList;
