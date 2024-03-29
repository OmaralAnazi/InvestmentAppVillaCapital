import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

function generateChartData(data) {
  const labels = [];
  const totalReturnData = [];
  const growthRateData = [];

  data.forEach((item) => {
    labels.push(`Year ${item.year}`);
    totalReturnData.push(item.totalReturn);
    growthRateData.push(item.growthRate);
  });

  return { labels, totalReturnData, growthRateData };
}

function InvestmentChart({ data }) {
  const chartData = generateChartData(data);
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null); // Ref to store the chart instance

  useEffect(() => {
    const createChart = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");

        // Destroy the previous chart instance if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Calculate the maximum value from both total return and growth rate data
        const maxTotalReturn = Math.max(...chartData.totalReturnData);
        const maxGrowthRate = Math.max(...chartData.growthRateData);
        const maxY = Math.max(maxTotalReturn, maxGrowthRate) * 1.5;

        // Create a new chart instance and store it in the ref
        chartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: chartData.labels,
            datasets: [
              {
                label: "Total Return (%)",
                data: chartData.totalReturnData,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
              {
                label: "Growth Rate (%)",
                data: chartData.growthRateData,
                borderColor: "rgb(255, 99, 132)",
                tension: 0.1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                suggestedMax: maxY, // Set the suggested max value for y-axis
              },
            },
            plugins: {
              legend: {
                position: "bottom", // Position the legend at the bottom
              },
            },
          },
        });
      }
    };

    createChart();

    // Cleanup function to destroy chart instance when component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData]); // Ensure effect runs when chartData changes

  return <canvas ref={canvasRef} />;
}

export default InvestmentChart;
