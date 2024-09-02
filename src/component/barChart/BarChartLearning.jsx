import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: [
      'Jawa Barat', 'Jawa Timur', 'Jawa Tengah', 
      'DKI Jakarta', 'Sumatera Utara', 'Banten', 
      'Bali', 'Sulawesi Selatan', 'Kalimantan Timur'
    ],
    datasets: [
      {
        data: [45, 30, 28, 50, 25, 20, 18, 15, 10], // Jumlah kerjasama instansi di setiap provinsi
        backgroundColor: ['#5971C0', '#9EC97F', '#F3C96B', '#F59E7A', '#A0C4FF', '#FFAFCC', '#BDE0FE', '#CAFFBF', '#FFC6FF'],
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
        ticks: {
          stepSize: 10, 
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '210px', marginTop: '20px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
