import axios from "axios";
import { ChartData } from "chart.js";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";

type GqlResponse = {
  issueContributions: { totalCount: number };
  pullRequestContributions: { totalCount: number };
  totalCommitContributions: number;
  totalPullRequestReviewContributions: number;
};

const ContributionBreakUp = () => {
  const router = useRouter();
  const username = (router.query.username as string) || "bhavyacodes";

  const [data, setData] = useState<null | GqlResponse>(null);

  useEffect(() => {
    axios
      .post(
        "https://api.github.com/graphql",
        {
          query: `query {
            user(login: "${username}") {
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

      .then((res) => res.data.data.user.contributionsCollection)
      .then((data: GqlResponse) => {
        setData(data);
      });
  }, [username]);

  if (!data) {
    return;
  }

  const chartJsData: ChartData<"radar"> = {
    labels: ["Issues", "Commits", "Pull Requests", "Pull Request Reviews"],
    datasets: [
      {
        label: "# of contributions",
        data: [
          data.issueContributions.totalCount,
          data.totalCommitContributions,
          data.pullRequestContributions.totalCount,
          data.totalPullRequestReviewContributions,
        ],
      },
    ],
  };

  return (
    <div>
      <Radar
        data={chartJsData}
        options={{
          plugins: {
            colors: {
              enabled: true,
            },
            legend: {
              display: false,
              labels: {},
            },
            filler: {},
            decimation: {},
          },
          scales: {
            r: {
              backgroundColor: "#999",
              // grid: {
              //   color: "green",
              // },
            },
          },
          borderColor: "#fff",
          backgroundColor: "#555",
        }}
      />
    </div>
  );
};

export default ContributionBreakUp;
