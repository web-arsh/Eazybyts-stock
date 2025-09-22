'use client'

import { Pie } from "react-chartjs-2";

export default function StockPieChart({ pieData }) {
  const { netIncome, dividendYield, interimNetIncome } = pieData;

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allows chart to fill container
  };

  const data = {
    labels: ['Net Income', 'Interim NetIncome', 'Dividend Yield'],
    datasets: [
      {
        data: [netIncome, interimNetIncome, dividendYield],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <Pie data={data} options={options} />
    </div>
  );
}
