import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ['Open','Close','Upcoming','Total'],
    datasets: [
      {
        data: [10, 5, 9, 40],
        backgroundColor: ['#5971C0', '#5971C0', '#5971C0'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
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
      y: {
        beginAtZero: true,
        min: 0,  // Menentukan nilai minimum pada sumbu Y
        max: 40,  // Menentukan nilai maksimum pada sumbu Y
        ticks: {
          stepSize: 10, // Menentukan langkah antara nilai-nilai pada sumbu Y
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '230px', marginTop: '20px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;