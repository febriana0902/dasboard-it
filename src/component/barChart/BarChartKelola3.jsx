import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart1 = ({ data, labels }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: '#5971C0',
        borderWidth: 0,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Change to horizontal bar chart
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        min: 100,
        max: 500,
        ticks: {
          stepSize: 20,
          callback: function (value) {
            return `${(value * 1).toFixed(0)} kcal`;
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '230px', marginTop: '20px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart1;