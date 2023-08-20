import axios from "axios";
import React, { useEffect } from "react";

const ContributionBreakUp = () => {
  useEffect(() => {
    axios
      .post(
        "https://api.github.com/graphql",
        {
          query: `query {
            user(login: "bhavyacodes") {
              name
              contributionsCollection {
								pullRequestContributions {
									totalCount
								}
								issueContributions{
									totalCount
								}
								totalCommitContributions
								totalPullRequestReviewContributions
              }
            }
          }`,
        },
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_GITHUB_API_TOKEN,
          },
        }
      )
      .then((res) => console.log(res.data));
  });
  return <div>ContributionBreakUp</div>;
};

export default ContributionBreakUp;
