import { Follower as FollowerType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import { Follower } from "./Follower";

const FollowersList: FC<{ username: string }> = ({ username }) => {
  const followersQuery = useQuery<FollowerType[]>({
    queryKey: ["users", "followers", username],
    queryFn: () =>
      axios
        .get(`https://api.github.com/users/${username}/followers`, {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_GITHUB_API_TOKEN,
          },
          params: {
            per_page: 100,
          },
        })
        .then((res) => res.data),
  });

  if (!followersQuery.data) {
    return null;
  }
  return (
    <div className="h-60 overflow-auto">
      {followersQuery.data.map((follower) => (
        <Follower key={follower.id} follower={follower} />
      ))}
    </div>
  );
};

export default FollowersList;
