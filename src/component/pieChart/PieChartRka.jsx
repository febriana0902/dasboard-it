import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrasi komponen Chart.js yang dibutuhkan
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartRka = () => {
  // Data untuk pie chart
  const data= {
    labels: ['Belum Terealisasi', 'Realisasi'],  // Label untuk setiap bagian pie chart
    datasets: [
      {
        data: [70.48, 29.51],  // Nilai untuk setiap bagian pie chart
        backgroundColor: ['#9EC97F', '#5971C0'],  // Warna untuk setiap bagian
        hoverBackgroundColor: ['#9EC97F', '#5971C0'],
      },
    ],
  };

  const options= {
    responsive: true,  // Agar chart menyesuaikan ukuran container
    maintainAspectRatio: false,  // Nonaktifkan aspek rasio agar bisa mengatur ukuran sendiri
    plugins: {
      legend: {
        display: true,
        position: 'bottom',  // Posisi legend di bawah chart
        labels: {
          color: '#333',  // Warna teks legend
          font: {
            size: 10,  // Ukuran font legend
          },
        padding: 2,  
        boxWidth: 10,  // Ukuran kotak warna legend
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
    <div style={{ width: '98%', height: '80px', marginTop:'-2px', marginBottom:'3px'}}>  {/* Sesuaikan ukuran chart */}
        <Pie data={data} options={options} />
    </div>
  )
};

export default PieChartRka;
