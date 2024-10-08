import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrasi komponen Chart.js yang dibutuhkan
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartRka = ({ comments }) => {
  // Hitung total like dan total komentar
  const totalLikes = comments.reduce((acc, comment) => acc + comment.likes, 0);
  const totalComments = comments.length;

  // Data untuk pie chart
  const data = {
    labels: ['Total Likes', 'Total Comments'],
    datasets: [
      {
        data: [totalLikes, totalComments],  // Nilai untuk setiap bagian pie chart
        backgroundColor: ['#9EC97F', '#5971C0'],  // Warna untuk setiap bagian
        hoverBackgroundColor: ['#9EC97F', '#5971C0'],
      },
    ],
  };

  const options = {
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
    <div style={{ width: '98%', height: '80px', marginTop: '-2px', marginBottom: '3px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartRka;
