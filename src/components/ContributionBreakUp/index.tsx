import axios from "axios";
import { ChartData } from "chart.js";
import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";

type GqlResponse = {
  issueContributions: { totalCount: number };
  pullRequestContributions: { totalCount: number };
  totalCommitContributions: number;
  totalPullRequestReviewContributions: number;
};

const ContributionBreakUp = () => {
  const [data, setData] = useState<null | GqlResponse>(null);

  useEffect(() => {
    axios
      .post(
        "https://api.github.com/graphql",
        {
          query: `query {
            user(login: "bhavyacodes") {
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
  }, []);
  console.log(data);

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
              backgroundColor: "#fff",
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
