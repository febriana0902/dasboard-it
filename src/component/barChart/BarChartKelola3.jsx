import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart3 = () => {
  const data = {
    labels: ['Manajemen & Organisasi', 'Operasi Perusahaan', 'Orang & Budaya', 'Produk & Layanan', 'Teknologi'],
    datasets: [
      {
        data: [0,0,0,0,0], // Data dalam format desimal
        backgroundColor: ['#5971C0', '#5971C0', '#5971C0', '#5971C0', '#5971C0'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Menggunakan grafik bar horizontal
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
        callbacks: {
          label: function (context) {
            // Menampilkan nilai dalam format desimal pada tooltip
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.x !== null) {
              label += `${context.parsed.x.toFixed(1)}`; // Menampilkan nilai dalam format desimal dengan 1 digit desimal
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        min: 0,
        max: 1,
        ticks: {
          stepSize: 0.2, // Langkah tetap 0.2
          callback: function (value) {
            return `${value.toFixed(1)} %`; // Menampilkan nilai dalam format desimal dengan 1 digit desimal pada sumbu X
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

export default BarChart3;
