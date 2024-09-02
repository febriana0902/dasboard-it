import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrasi komponen Chart.js yang dibutuhkan
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartLearning = () => {
  // Data untuk pie chart
  const data= {
    labels: ['Divisi A', 'Divisi B', 'Divisi C', 'Divisi D'],  // Label untuk setiap bagian pie chart
    datasets: [
      {
        data: [30, 30, 20, 10],  // Nilai untuk setiap bagian pie chart
        backgroundColor: ['#DE6E6A', '#5971C0', '#9EC97F', '#F3C96B'],  // Warna untuk setiap bagian
        hoverBackgroundColor: ['#DE6E6A', '#5971C0', '#9EC97F', '#F3C96B'],
      },
    ],
  };

  const options= {
    responsive: true,  // Agar chart menyesuaikan ukuran container
    maintainAspectRatio: false,  // Nonaktifkan aspek rasio agar bisa mengatur ukuran sendiri
    plugins: {
      legend: {
        display: true,
        position: 'right',  // Posisi legend di bawah chart
        labels: {
          color: '#333',  // Warna teks legend
          font: {
            size: 17,  // Ukuran font legend
          },
        padding: 2,  
        boxWidth: 20,  // Ukuran kotak warna legend
        },
      },
      tooltip: {
        backgroundColor: '#000',  // Warna latar belakang tooltip
        bodyColor: '#fff',  // Warna teks tooltip
        bodyFont: {
          size: 12,  // Ukuran font tooltip
        },
      },
    },
  };

  return (
    <div style={{ width: '98%', height: '170px', marginTop: '20px', marginLeft: '-120px'}}>  {/* Sesuaikan ukuran chart */}
        <Pie data={data} options={options} />
    </div>
  )
};

export default PieChartLearning;
