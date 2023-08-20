import { Follower as FollowerType } from "@/types";
import React, { FC } from "react";

export const Follower: FC<{ follower: FollowerType }> = ({ follower }) => {
  return (
    <div className="flex items-center mb-4 bg-base-200 rounded p-2">
      <div>
        <img
          className="w-12 rounded-full"
          src={follower.avatar_url}
          alt={`${follower.login} avatar`}
        />
      </div>
      <div className="grow-1">
        <p className="ml-4">{follower.login}</p>
      </div>
    </div>
  );
};
