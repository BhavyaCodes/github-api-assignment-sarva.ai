import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { RepositoryCard } from "./RepositoryCard";
import { Repository } from "@/types";

const RepositoryList: FC<{ username: string }> = ({ username }) => {
  const inifiniteRepositoryQuery = useInfiniteQuery<Repository[]>({
    queryKey: ["users", "repositories-infinite", username],
    // enabled: !!data?.login,
    queryFn: () =>
      axios
        .get(`https://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_GITHUB_API_TOKEN,
          },
          params: {
            page: 1,
            per_page: 15,
            sort: "created",
            direction: "desc",
          },
        })
        .then((res) => res.data),
    retry: false,
  });

  // console.log(first);
  if (!inifiniteRepositoryQuery.data) {
    return null;
  }

  return (
    <div>
      {inifiniteRepositoryQuery.data.pages
        .flatMap((data) => data)
        .map((repo) => (
          <RepositoryCard key={repo.id} {...repo} />
        ))}
    </div>
  );
};

export default RepositoryList;
