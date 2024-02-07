"use client";
import { transactionTypeOptions } from "@/Utils";
import { ArcElement, Chart } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement);

const backgroundColor = transactionTypeOptions.map((type) => type.color);
const labels = transactionTypeOptions.map((type) => type.label);

const options = {
  cutout: 110,
  borderRadius: 20,
  spacing: 5,
};

const Graph = ({ transactionData }) => {
  const [grapthData, setGraphData] = useState({
    labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [0, 0, 0],
        backgroundColor,
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    const colors = [];
    const percentage = [];

    Object.entries(transactionData).map(([key, value], i) => {
      colors.push(value.color);
      percentage.push(value.percentage);
    });

    setGraphData((state) => ({
      ...state,
      datasets: [
        { ...state.datasets[0], data: percentage, backgroundColor: colors },
      ],
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionData]);

  return <Doughnut data={grapthData} options={options} />;
};

export default Graph;
