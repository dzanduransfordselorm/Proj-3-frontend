import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import Cohort_Data from "../assets/data";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ cohort }) => {
  const getScoresForCohort = (cohortName) => {
    const cohort = Cohort_Data.CohortPerformance.find(
      (c) => c.Cohort === cohortName
    );

    if (cohort) {
      return cohort.Performance.map((p) => p.Score);
    } else {
      return [];
    }
  };

  const ce1Scores = getScoresForCohort(cohort);

  const lineChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Score",
        data: ce1Scores,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };
  const options = {};

  return <Line options={options} data={lineChartData} />;
};

export default LineChart;
