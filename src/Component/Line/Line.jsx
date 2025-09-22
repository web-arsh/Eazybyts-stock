"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
  Filler,
} from "chart.js";
import { useEffect } from "react";
import graphqlDataFunction from "../Context/graphql";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
  Filler
);

export default function StockLineChart({ companyName }) {
  const { data, getCompanyInfo } = graphqlDataFunction();

  // fetch company info on mount
  useEffect(() => {
    (async () => {
      getCompanyInfo("Tata Steel");
    })();
  }, []);

  const date = [];
  const stockValue = [];

  data?.getLiveData.datasets.map((value) => {
    if (value.metric === "Price") {
      value.values.map((itm) => {
        stockValue.push(itm[1]);
        return date.push(itm[0]);
      });
    }
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allows chart to fill container
  };

  const LiveData = {
    labels: date,
    datasets: [
      {
        label: companyName,
        data: stockValue,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <Line data={LiveData} options={options} />
    </div>
  );
}
