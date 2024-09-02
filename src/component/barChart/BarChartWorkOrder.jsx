import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components needed for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  // Data untuk bar chart
  const data = {
    labels: ['Close', 'Open', 'Upcoming'],
    datasets: [
      {
        // label: 'Sales',
        data: [14, 10, 3],
        backgroundColor: ['#5971C0', '#9EC97F', '#F3C96B'],
        borderWidth: 0,
      },
    ],
  };

  // Opsi untuk bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
      title: {
        display: false,
        text: 'Sales Overview',
      },
      tooltip: {
        bodyFont: {
          size: 12, // Mengatur ukuran font untuk konten utama tooltip
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
            stepSize: 20, // Menentukan langkah antara nilai-nilai pada sumbu Y
          },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '160px', marginTop:'20px'}}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
