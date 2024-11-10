import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ chartData }) => {
  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Bar data={chartData} options={{
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
          tooltip: { enabled: true }
        },
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true }
        }
      }} />
    </div>
  );
};

export default BarChart;
