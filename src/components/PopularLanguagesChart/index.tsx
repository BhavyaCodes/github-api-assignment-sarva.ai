import React, { useMemo } from "react";

import { Doughnut } from "react-chartjs-2";
import { languageColors } from "@/assets/language-colors.ts";
import { ChartData } from "chart.js";

const PopularLanguagesChart = ({
  username,
  repoData,
}: {
  repoData: {
    id: number;
    language: null | string;
  }[];
  username: string;
}) => {
  const languageCountData = useMemo(() => {
    const result: Record<string, number> = {};

    repoData.forEach((repo) => {
      if (!repo.language) return;
      if (!result[repo.language]) {
        result[repo.language] = 1;
      } else {
        result[repo.language] += 1;
      }
    });

    return result;
  }, [username]);

  console.log(languageCountData);

  const memoizedChartData = useMemo(() => {
    const chartData: ChartData<"doughnut"> = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          // borderColor: [],
          borderWidth: 0,
        },
      ],
    };

    for (const language in languageCountData) {
      chartData.labels!.push(language);
      chartData.datasets[0].data.push(languageCountData[language]);
      (chartData.datasets[0].backgroundColor as string[]).push(
        languageColors[language]?.color || "pink"
      );
    }
    return chartData;
  }, [username]);

  console.log(memoizedChartData);

  return (
    <div>
      <Doughnut data={memoizedChartData} />
    </div>
  );
};

export default PopularLanguagesChart;
