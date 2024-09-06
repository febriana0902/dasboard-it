import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrasi komponen Chart.js yang dibutuhkan
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartLearning = ({ products }) => {
  // Fungsi untuk menghitung jumlah produk berdasarkan status stok
  const stockCount = () => {
    const lowStock = products.filter(product => product.availabilityStatus === 'Low Stock').length;
    const inStock = products.filter(product => product.availabilityStatus === 'In Stock').length;

    return [lowStock, inStock];
  };

  // Data untuk Pie Chart
  const data = {
    labels: ['Low Stock', 'In Stock'],  // Label sesuai dengan status stok
    datasets: [
      {
        data: stockCount(),  // Menggunakan fungsi stockCount untuk mengambil data
        backgroundColor: [
          '#5470C6', 
          '#91CC75', 
          '#FAC858', 
          '#EE6666', 
          '#73C0DE'
        ],
        borderColor: [
          '#5470C6', 
          '#91CC75', 
          '#FAC858', 
          '#EE6666', 
          '#73C0DE'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Opsi untuk Pie Chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: '#333',
          font: {
            size: 12,
          },
          padding: 2,
          boxWidth: 20,
        },
      },
      tooltip: {
        backgroundColor: '#000',
        bodyColor: '#fff',
        bodyFont: {
          size: 12,
        },
      },
    },
  };

  return (
    <div className='pie-style-learning' style={{ width: '100%', height: '230px', marginTop: '30px', marginLeft: '-40px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartLearning;
