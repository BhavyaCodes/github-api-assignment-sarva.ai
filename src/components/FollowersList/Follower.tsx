import { Follower as FollowerType } from "@/types";
import React, { FC } from "react";

export const Follower: FC<{ follower: FollowerType }> = ({ follower }) => {
  return (
    <div className="flex">
      <div>
        <img src={follower.avatar_url} alt={`${follower.login} avatar`} />
      </div>
      <div className="grow-1">
        <p>{follower.login}</p>
      </div>
    </div>
  );
};
