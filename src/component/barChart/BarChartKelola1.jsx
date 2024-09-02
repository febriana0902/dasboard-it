import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart1 = () => {
  const data = {
    labels: ['APO', 'BAI', 'DSS', 'EDM','MEA'],
    datasets: [
      {
        data: [40,39,0,100,75],
        backgroundColor: ['#5971C0', '#5971C0', '#5971C0', '#5971C0','#5971C0'],
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
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: function (value) {
            return `${(value * 1).toFixed(0)}%`;
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart1;