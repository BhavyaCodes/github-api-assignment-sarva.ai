import { Repository } from "@/types";
import { ChartData } from "chart.js";
import { FC, useMemo } from "react";
import { Bar } from "react-chartjs-2";

export const PopularRepos: FC<{
  repoData: Repository[];
  username: string;
}> = ({ repoData, username }) => {
  const chartData = useMemo(() => {
    const sortedAndSliced = repoData
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .filter((repo) => repo.stargazers_count);

    const result: ChartData<"bar"> = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#5AD4E6",
            "#FC618D",
            "#FCE566",
            "#7BD88F",
            "#FD9353",
          ],
        },
      ],
    };

    sortedAndSliced.forEach((repo) => {
      result.labels?.push(repo.name);
      result.datasets[0].data.push(repo.stargazers_count);
    });

    return result;
  }, [username]);

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
              // position: "top" as const,
              // labels: {},
            },
            // title: {
            //   display: true,
            //   text: "Chart.js Bar Chart",
            // },
          },
        }}
      />
    </div>
  );
};
